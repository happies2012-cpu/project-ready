const express = require('express');
const router = express.Router();
const prisma = require('../db/prisma');
const { authenticateJWT } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get reviews for a project
router.get('/project/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const [reviews, total] = await Promise.all([
            prisma.review.findMany({
                where: {
                    projectId,
                    isApproved: true
                },
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.review.count({
                where: {
                    projectId,
                    isApproved: true
                }
            })
        ]);

        res.json({
            reviews,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get reviews error:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// Create review
router.post(
    '/',
    authenticateJWT,
    [
        body('projectId').notEmpty().withMessage('Project ID is required'),
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
        body('comment').optional().trim()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { projectId, rating, comment } = req.body;
            const userId = req.user.id;
            const userName = req.user.name;

            // Check if user already reviewed this project
            const existingReview = await prisma.review.findUnique({
                where: {
                    projectId_userId: {
                        projectId,
                        userId
                    }
                }
            });

            if (existingReview) {
                return res.status(400).json({ error: 'You have already reviewed this project' });
            }

            // Create review
            const review = await prisma.review.create({
                data: {
                    projectId,
                    userId,
                    userName,
                    rating,
                    comment,
                    isApproved: false // Requires admin approval
                }
            });

            // Update project rating
            const allReviews = await prisma.review.findMany({
                where: {
                    projectId,
                    isApproved: true
                }
            });

            const avgRating = allReviews.reduce((sum, r) => sum + r.rating, rating) / (allReviews.length + 1);

            await prisma.project.update({
                where: { id: projectId },
                data: {
                    rating: avgRating,
                    ratingCount: allReviews.length + 1
                }
            });

            res.status(201).json({ review });
        } catch (error) {
            console.error('Create review error:', error);
            res.status(500).json({ error: 'Failed to create review' });
        }
    }
);

module.exports = router;
