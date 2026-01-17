const prisma = require('../db/prisma');
const { validationResult } = require('express-validator');
const { uploadToS3, deleteFromS3 } = require('../services/s3Service');
const { incrementViews, cacheProject, getCachedProject } = require('../services/cacheService');

// Helper function to generate slug
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Get all projects with pagination and filtering
exports.getAllProjects = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            category,
            tags,
            search,
            featured,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        // Build where clause
        const where = {
            isActive: true
        };

        if (category) {
            where.category = category;
        }

        if (tags) {
            where.tags = {
                hasSome: tags.split(',')
            };
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { tags: { hasSome: [search] } }
            ];
        }

        if (featured === 'true') {
            where.isFeatured = true;
        }

        // Get projects
        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where,
                skip,
                take,
                orderBy: { [sortBy]: order },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    category: true,
                    tags: true,
                    thumbnail: true,
                    price: true,
                    isPremium: true,
                    isFeatured: true,
                    views: true,
                    downloads: true,
                    likes: true,
                    rating: true,
                    ratingCount: true,
                    authorName: true,
                    techStack: true,
                    framework: true,
                    slug: true,
                    createdAt: true,
                    updatedAt: true
                }
            }),
            prisma.project.count({ where })
        ]);

        res.json({
            projects,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get all projects error:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

// Get single project by slug
exports.getProjectBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        // Try to get from cache first
        let project = await getCachedProject(slug);

        if (!project) {
            project = await prisma.project.findUnique({
                where: { slug },
                include: {
                    files: true,
                    reviews: {
                        where: { isApproved: true },
                        orderBy: { createdAt: 'desc' },
                        take: 10
                    }
                }
            });

            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            // Cache the project
            await cacheProject(slug, project);
        }

        // Increment views asynchronously
        incrementViews(project.id);

        // Check Access Logic
        let hasAccess = true;

        if (project.isPremium) {
            hasAccess = false;

            // 1. Author or Admin always has access
            if (req.user && (req.user.id === project.authorId || req.user.role === 'admin')) {
                hasAccess = true;
            }
            // 2. Check if user purchased it
            else if (req.user) {
                // Check Subscription (from user token or internal call - for now assume token has it or we query auth)
                // Note: In a real microservice, we might need to query Auth Service or trust the JWT claims.
                // Here we trust JWT if it had roles/plans.

                // Check Purchase
                const purchase = await prisma.userPurchase.findUnique({
                    where: {
                        userId_projectId: {
                            userId: req.user.id,
                            projectId: project.id
                        }
                    }
                });

                if (purchase) hasAccess = true;
            }
        }

        // Return project with access flag
        res.json({ project, hasAccess });
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

// Create new project
exports.createProject = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            description,
            category,
            tags,
            thumbnail,
            images,
            demoUrl,
            sourceUrl,
            downloadUrl,
            price,
            isPremium,
            techStack,
            framework,
            language,
            metaTitle,
            metaDescription,
            keywords
        } = req.body;

        // Generate slug
        const slug = generateSlug(title);

        // Check if slug exists
        const existingProject = await prisma.project.findUnique({
            where: { slug }
        });

        if (existingProject) {
            return res.status(400).json({ error: 'Project with this title already exists' });
        }

        // Get user info from auth token (set by auth middleware)
        const authorId = req.user.id;
        const authorName = req.user.name;
        const authorEmail = req.user.email;

        // Create project
        const project = await prisma.project.create({
            data: {
                title,
                description,
                category,
                tags: tags || [],
                thumbnail,
                images: images || [],
                demoUrl,
                sourceUrl,
                downloadUrl,
                price: price || 0,
                isPremium: isPremium || false,
                techStack: techStack || [],
                framework,
                language,
                slug,
                metaTitle: metaTitle || title,
                metaDescription: metaDescription || description.substring(0, 160),
                keywords: keywords || tags || [],
                authorId,
                authorName,
                authorEmail,
                publishedAt: new Date()
            }
        });

        res.status(201).json({ project });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if project exists and user owns it
        const existingProject = await prisma.project.findUnique({
            where: { id }
        });

        if (!existingProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (existingProject.authorId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to update this project' });
        }

        // Update project
        const project = await prisma.project.update({
            where: { id },
            data: {
                ...req.body,
                updatedAt: new Date()
            }
        });

        res.json({ project });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if project exists and user owns it
        const project = await prisma.project.findUnique({
            where: { id },
            include: { files: true }
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (project.authorId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to delete this project' });
        }

        // Delete files from S3
        for (const file of project.files) {
            await deleteFromS3(file.fileUrl);
        }

        // Delete project (cascade will delete files and reviews)
        await prisma.project.delete({
            where: { id }
        });

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
};

// Toggle favorite
exports.toggleFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if already favorited
        const existing = await prisma.favorite.findUnique({
            where: {
                projectId_userId: {
                    projectId: id,
                    userId
                }
            }
        });

        if (existing) {
            // Remove favorite
            await prisma.favorite.delete({
                where: { id: existing.id }
            });
            res.json({ favorited: false });
        } else {
            // Add favorite
            await prisma.favorite.create({
                data: {
                    projectId: id,
                    userId
                }
            });
            res.json({ favorited: true });
        }
    } catch (error) {
        console.error('Toggle favorite error:', error);
        res.status(500).json({ error: 'Failed to toggle favorite' });
    }
};

// Get user favorites
exports.getUserFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 20 } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const [favorites, total] = await Promise.all([
            prisma.favorite.findMany({
                where: { userId },
                skip,
                take,
                include: {
                    project: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            category: true,
                            thumbnail: true,
                            slug: true,
                            rating: true,
                            views: true,
                            downloads: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.favorite.count({ where: { userId } })
        ]);

        res.json({
            favorites: favorites.map(f => f.project),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
};

// Increment download count
exports.incrementDownload = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.project.update({
            where: { id },
            data: {
                downloads: {
                    increment: 1
                }
            }
        });

        res.json({ message: 'Download count incremented' });
    } catch (error) {
        console.error('Increment download error:', error);
        res.status(500).json({ error: 'Failed to increment download' });
    }
};

// Get trending projects
exports.getTrendingProjects = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        // Get projects with highest views in last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const projects = await prisma.project.findMany({
            where: {
                isActive: true,
                updatedAt: {
                    gte: sevenDaysAgo
                }
            },
            orderBy: [
                { views: 'desc' },
                { downloads: 'desc' },
                { rating: 'desc' }
            ],
            take: parseInt(limit),
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                thumbnail: true,
                slug: true,
                views: true,
                downloads: true,
                rating: true,
                ratingCount: true,
                techStack: true
            }
        });

        res.json({ projects });
    } catch (error) {
        console.error('Get trending projects error:', error);
        res.status(500).json({ error: 'Failed to fetch trending projects' });
    }
};
