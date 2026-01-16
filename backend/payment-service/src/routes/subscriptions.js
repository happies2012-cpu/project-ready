const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');
const { authenticateJWT, requireRole } = require('../middleware/auth');

// Get all subscriptions (admin)
router.get('/admin/all', authenticateJWT, requireRole(['admin']), async (req, res) => {
    try {
        const { page = 1, limit = 20, status } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const where = status ? { status } : {};

        const [subscriptions, total] = await Promise.all([
            prisma.subscription.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.subscription.count({ where })
        ]);

        res.json({
            subscriptions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get subscriptions error:', error);
        res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
});

// Get user subscriptions
router.get('/user', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;

        const subscriptions = await prisma.subscription.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ subscriptions });
    } catch (error) {
        console.error('Get user subscriptions error:', error);
        res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
});

// Cancel subscription
router.post('/:id/cancel', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;

        const subscription = await prisma.subscription.findUnique({
            where: { id }
        });

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        if (subscription.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updatedSubscription = await prisma.subscription.update({
            where: { id },
            data: {
                cancelAtPeriodEnd: true,
                cancelledAt: new Date()
            }
        });

        res.json({ subscription: updatedSubscription });
    } catch (error) {
        console.error('Cancel subscription error:', error);
        res.status(500).json({ error: 'Failed to cancel subscription' });
    }
});

module.exports = router;
