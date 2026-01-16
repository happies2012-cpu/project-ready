const prisma = require('../db/prisma');
const stripeService = require('../services/stripeService');
const { generateInvoice } = require('../services/invoiceService');

// Generate unique invoice number
const generateInvoiceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `INV-${timestamp}-${random}`;
};

// Create payment
exports.createPayment = async (req, res) => {
    try {
        const { amount, projectId, projectTitle, description } = req.body;
        const userId = req.user.id;
        const userName = req.user.name;
        const userEmail = req.user.email;

        // Create payment intent with Stripe
        const { clientSecret, paymentIntentId } = await stripeService.createPaymentIntent(
            amount,
            process.env.DEFAULT_CURRENCY || 'INR',
            {
                userId,
                projectId: projectId || '',
                projectTitle: projectTitle || ''
            }
        );

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                userId,
                userName,
                userEmail,
                amount,
                currency: process.env.DEFAULT_CURRENCY || 'INR',
                status: 'pending',
                paymentMethod: 'card',
                gateway: 'stripe',
                gatewayPaymentId: paymentIntentId,
                projectId,
                projectTitle,
                description,
                invoiceNumber: generateInvoiceNumber()
            }
        });

        res.json({
            payment,
            clientSecret
        });
    } catch (error) {
        console.error('Create payment error:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
};

// Get payment by ID
exports.getPayment = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await prisma.payment.findUnique({
            where: { id }
        });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // Check authorization
        if (payment.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        res.json({ payment });
    } catch (error) {
        console.error('Get payment error:', error);
        res.status(500).json({ error: 'Failed to fetch payment' });
    }
};

// Get user payments
exports.getUserPayments = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 20, status } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const where = { userId };
        if (status) {
            where.status = status;
        }

        const [payments, total] = await Promise.all([
            prisma.payment.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.payment.count({ where })
        ]);

        res.json({
            payments,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get user payments error:', error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
};

// Confirm payment (called after successful payment)
exports.confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        // Verify payment with Stripe
        const paymentIntent = await stripeService.confirmPayment(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ error: 'Payment not successful' });
        }

        // Update payment record
        const payment = await prisma.payment.update({
            where: { gatewayPaymentId: paymentIntentId },
            data: {
                status: 'completed',
                updatedAt: new Date()
            }
        });

        // Generate invoice
        const invoiceUrl = await generateInvoice(payment);

        // Update payment with invoice URL
        await prisma.payment.update({
            where: { id: payment.id },
            data: { invoiceUrl }
        });

        res.json({
            payment,
            invoiceUrl
        });
    } catch (error) {
        console.error('Confirm payment error:', error);
        res.status(500).json({ error: 'Failed to confirm payment' });
    }
};

// Request refund
exports.requestRefund = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason, amount } = req.body;

        // Get payment
        const payment = await prisma.payment.findUnique({
            where: { id }
        });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // Check authorization
        if (payment.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        if (payment.status !== 'completed') {
            return res.status(400).json({ error: 'Payment not completed' });
        }

        // Create refund with Stripe
        const refund = await stripeService.createRefund(
            payment.gatewayPaymentId,
            amount
        );

        // Update payment record
        const updatedPayment = await prisma.payment.update({
            where: { id },
            data: {
                status: 'refunded',
                refundAmount: amount || payment.amount,
                refundReason: reason,
                refundedAt: new Date()
            }
        });

        res.json({
            payment: updatedPayment,
            refund
        });
    } catch (error) {
        console.error('Refund error:', error);
        res.status(500).json({ error: 'Failed to process refund' });
    }
};

// Get payment statistics (admin only)
exports.getPaymentStats = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const [totalRevenue, totalPayments, completedPayments, pendingPayments] = await Promise.all([
            prisma.payment.aggregate({
                where: { status: 'completed' },
                _sum: { amount: true }
            }),
            prisma.payment.count(),
            prisma.payment.count({ where: { status: 'completed' } }),
            prisma.payment.count({ where: { status: 'pending' } })
        ]);

        res.json({
            totalRevenue: totalRevenue._sum.amount || 0,
            totalPayments,
            completedPayments,
            pendingPayments
        });
    } catch (error) {
        console.error('Get payment stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};
