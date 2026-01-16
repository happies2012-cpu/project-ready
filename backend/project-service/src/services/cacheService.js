const redis = require('redis');
const prisma = require('../db/prisma');

let redisClient;

// Initialize Redis client
const initRedis = async () => {
    if (!redisClient) {
        redisClient = redis.createClient({
            url: process.env.REDIS_URL
        });

        redisClient.on('error', (err) => {
            console.error('Redis error:', err);
        });

        await redisClient.connect();
        console.log('✅ Redis connected');
    }
    return redisClient;
};

// Cache project data
exports.cacheProject = async (slug, project, ttl = 3600) => {
    try {
        const client = await initRedis();
        await client.setEx(`project:${slug}`, ttl, JSON.stringify(project));
    } catch (error) {
        console.error('Cache set error:', error);
    }
};

// Get cached project
exports.getCachedProject = async (slug) => {
    try {
        const client = await initRedis();
        const cached = await client.get(`project:${slug}`);
        return cached ? JSON.parse(cached) : null;
    } catch (error) {
        console.error('Cache get error:', error);
        return null;
    }
};

// Increment view count (async, non-blocking)
exports.incrementViews = async (projectId) => {
    try {
        // Use setTimeout to make it truly async
        setTimeout(async () => {
            await prisma.project.update({
                where: { id: projectId },
                data: {
                    views: {
                        increment: 1
                    }
                }
            });
        }, 0);
    } catch (error) {
        console.error('Increment views error:', error);
    }
};

// Invalidate cache
exports.invalidateCache = async (slug) => {
    try {
        const client = await initRedis();
        await client.del(`project:${slug}`);
    } catch (error) {
        console.error('Cache invalidate error:', error);
    }
};

module.exports.initRedis = initRedis;
