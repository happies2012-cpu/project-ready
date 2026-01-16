const axios = require('axios');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

// Verify JWT token with auth service
exports.authenticateJWT = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token with auth service
        const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/verify`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        req.user = response.data.user;
        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Require specific role
exports.requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        next();
    };
};
