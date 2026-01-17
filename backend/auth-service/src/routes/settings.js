const express = require('express');
const router = express.Router();
const prisma = new PrismaClient(); // Assuming you have a prisma instance export or verify import
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/jwt');
const { body, validationResult } = require('express-validator');

const db = new PrismaClient();

// GET /api/settings/public - Get public settings
router.get('/public', async (req, res) => {
    try {
        const settings = await db.systemSetting.findMany({
            where: { isPublic: true },
            select: { key: true, value: true, type: true }
        });

        // Convert types
        const formatted = settings.reduce((acc, curr) => {
            let val = curr.value;
            if (curr.type === 'boolean') val = val === 'true';
            if (curr.type === 'number') val = Number(val);
            acc[curr.key] = val;
            return acc;
        }, {});

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// GET /api/settings - Get all settings (Admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const settings = await db.systemSetting.findMany();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// PUT /api/settings/:key - Update setting (Admin only)
router.put('/:key', [
    authenticate,
    authorize('admin'),
    body('value').notEmpty().withMessage('Value is required')
], async (req, res) => {
    try {
        const { key } = req.params;
        const { value, isPublic, description } = req.body;

        const setting = await db.systemSetting.update({
            where: { key },
            data: {
                value: String(value),
                ...(isPublic !== undefined && { isPublic }),
                ...(description !== undefined && { description })
            }
        });

        res.json(setting);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update setting' });
    }
});

module.exports = router;
