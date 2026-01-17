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

// Grant access to a project (create purchase record)
router.post('/grant-access', checkInternalSecret, async (req, res) => {
    try {
        const { userId, projectId, amount } = req.body;

        if (!userId || !projectId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if already purchased
        const existing = await prisma.userPurchase.findUnique({
            where: {
                userId_projectId: {
                    userId,
                    projectId
                }
            }
        });

        if (existing) {
            return res.json({ message: 'Access already granted', purchase: existing });
        }

        const purchase = await prisma.userPurchase.create({
            data: {
                userId,
                projectId,
                amount: amount || 0
            }
        });

        res.json({ message: 'Access granted successfully', purchase });
    } catch (error) {
        console.error('Grant access error:', error);
        res.status(500).json({ error: 'Failed to grant access' });
    }
});

module.exports = router;
