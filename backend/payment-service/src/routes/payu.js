const express = require('express');
const router = express.Router();
const payuService = require('../services/payuService');
const prisma = require('../db/prisma');
const { generateInvoice } = require('../services/invoiceService');

// PayU Success Handler
router.post('/payu/success', express.urlencoded({ extended: true }), async (req, res) => {
    try {
        const data = req.body;

        // Verify hash integrity
        if (!payuService.verifyResponseHash(data)) {
            console.error('PayU hash verification failed');
            return res.redirect(`${process.env.FRONTEND_URL}/payment/failure?reason=hash_mismatch`);
        }

        if (data.status === 'success') {
            // Find payment by txnid (gatewayPaymentId)
            // txnid format from PayU is typically what we sent
            const payment = await prisma.payment.findUnique({
                where: { gatewayPaymentId: data.txnid }
            });

            if (payment) {
                // Update payment status
                const updatedPayment = await prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: 'completed',
                        paymentMethod: data.mode || 'netbanking',
                        gatewayOrderId: data.mihpayid,
                        metadata: { ...payment.metadata, payuResponse: data }
                    }
                });

                // Generate Invoice
                const invoicePath = await generateInvoice(updatedPayment);

                // Update with invoice URL (in real app, upload PDF to S3 and save URL)
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { invoiceUrl: invoicePath }
                });

                // --- GRANT ACCESS LOGIC ---
                const axios = require('axios'); // Ensure axios is available or use fetch
                const internalSecret = process.env.INTERNAL_API_SECRET;

                try {
                    // 1. Check if it's a Project Purchase
                    if (payment.projectId) {
                        await axios.post('http://project-service:3002/api/internal/grant-access', {
                            userId: payment.userId,
                            projectId: payment.projectId,
                            amount: payment.amount
                        }, { headers: { 'x-internal-secret': internalSecret } });
                    }

                    // 2. Check if it's a Subscription (e.g. metadata.type === 'subscription')
                    if (payment.subscriptionPlan) { // or check metadata
                        await axios.post('http://auth-service:3001/api/internal/update-subscription', {
                            userId: payment.userId,
                            plan: payment.subscriptionPlan,
                            status: 'active',
                            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days default
                        }, { headers: { 'x-internal-secret': internalSecret } });
                    }
                } catch (err) {
                    console.error('Failed to grant access on other services:', err.message);
                    // Don't fail the webhook response, just log it. 
                    // Ideally we should have a retry mechanism or event queue here.
                }
            }

            return res.redirect(`${process.env.FRONTEND_URL}/payment/success?txnid=${data.txnid}`);
        } else {
            return res.redirect(`${process.env.FRONTEND_URL}/payment/failure?reason=payu_status_failed`);
        }
    } catch (error) {
        console.error('PayU success handler error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/payment/failure?reason=server_error`);
    }
});

// PayU Failure Handler
router.post('/payu/failure', express.urlencoded({ extended: true }), async (req, res) => {
    try {
        const data = req.body;

        // Find payment and mark as failed
        await prisma.payment.updateMany({
            where: { gatewayPaymentId: data.txnid },
            data: {
                status: 'failed',
                metadata: { payuFailure: data }
            }
        });

        res.redirect(`${process.env.FRONTEND_URL}/payment/failure?txnid=${data.txnid}`);
    } catch (error) {
        console.error('PayU failure handler error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
    }
});

module.exports = router;
