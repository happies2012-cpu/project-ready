const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');

// Middleware to check internal secret
const checkInternalSecret = (req, res, next) => {
    const secret = req.headers['x-internal-secret'];
    if (secret !== process.env.INTERNAL_API_SECRET) {
        return res.status(403).json({ error: 'Unauthorized internal access' });
    }
    next();
};

// Update user subscription
router.post('/update-subscription', checkInternalSecret, async (req, res) => {
    try {
        const { userId, plan, status, expiresAt } = req.body;

        if (!userId || !plan || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                subscriptionPlan: plan,
                subscriptionStatus: status,
                subscriptionExpiresAt: expiresAt ? new Date(expiresAt) : null
            }
        });

        res.json({ message: 'Subscription updated successfully', userId: user.id });
    } catch (error) {
        console.error('Update subscription error:', error);
        res.status(500).json({ error: 'Failed to update subscription' });
    }
});

module.exports = router;
