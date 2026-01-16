const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        });

        res.json({ categories });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get category by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        const category = await prisma.category.findUnique({
            where: { slug }
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json({ category });
    } catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

module.exports = router;
