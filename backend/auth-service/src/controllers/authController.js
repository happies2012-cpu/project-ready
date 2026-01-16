const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// In-memory user store (replace with database in production)
const users = new Map();
const refreshTokens = new Set();

// Generate JWT tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
    );

    return { accessToken, refreshToken };
};

// Register new user
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = req.body;

        // Check if user exists
        if (users.has(email)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = {
            id: Date.now().toString(),
            email,
            name,
            password: hashedPassword,
            role: 'user',
            provider: 'local',
            createdAt: new Date()
        };

        users.set(email, user);

        // Generate tokens
        const tokens = generateTokens(user);
        refreshTokens.add(tokens.refreshToken);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({
            user: userWithoutPassword,
            ...tokens
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user
        const user = users.get(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate tokens
        const tokens = generateTokens(user);
        refreshTokens.add(tokens.refreshToken);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            user: userWithoutPassword,
            ...tokens
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Refresh access token
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken || !refreshTokens.has(refreshToken)) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // Find user (in production, fetch from database)
        const user = Array.from(users.values()).find(u => u.id === decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Generate new tokens
        const tokens = generateTokens(user);

        // Remove old refresh token and add new one
        refreshTokens.delete(refreshToken);
        refreshTokens.add(tokens.refreshToken);

        res.json(tokens);
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(401).json({ error: 'Invalid refresh token' });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken) {
            refreshTokens.delete(refreshToken);
        }
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
};

// OAuth callback handler
exports.oauthCallback = async (req, res) => {
    try {
        const user = req.user;

        // Store or update user in database
        if (!users.has(user.email)) {
            users.set(user.email, {
                ...user,
                id: user.id,
                role: 'user',
                createdAt: new Date()
            });
        }

        // Generate tokens
        const tokens = generateTokens(user);
        refreshTokens.add(tokens.refreshToken);

        // Redirect to frontend with tokens
        const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('OAuth callback error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/auth?error=oauth_failed`);
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = Array.from(users.values()).find(u => u.id === req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
};

// Forgot password (placeholder)
exports.forgotPassword = async (req, res) => {
    res.status(501).json({ message: 'Password reset not implemented yet' });
};

// Reset password (placeholder)
exports.resetPassword = async (req, res) => {
    res.status(501).json({ message: 'Password reset not implemented yet' });
};
