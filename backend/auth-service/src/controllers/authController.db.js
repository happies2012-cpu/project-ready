const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const prisma = require('../db/prisma');

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
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: 'user',
                provider: 'local'
            }
        });

        // Generate tokens
        const tokens = generateTokens(user);

        // Store refresh token
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);

        await prisma.refreshToken.create({
            data: {
                token: tokens.refreshToken,
                userId: user.id,
                expiresAt: refreshTokenExpiry
            }
        });

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
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({ error: 'Account is deactivated' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate tokens
        const tokens = generateTokens(user);

        // Store refresh token
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);

        await prisma.refreshToken.create({
            data: {
                token: tokens.refreshToken,
                userId: user.id,
                expiresAt: refreshTokenExpiry
            }
        });

        // Create session
        const sessionExpiry = new Date();
        sessionExpiry.setDate(sessionExpiry.getDate() + 7);

        await prisma.session.create({
            data: {
                userId: user.id,
                token: tokens.accessToken,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
                expiresAt: sessionExpiry
            }
        });

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

        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token required' });
        }

        // Find refresh token in database
        const storedToken = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true }
        });

        if (!storedToken) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // Check if token is expired
        if (new Date() > storedToken.expiresAt) {
            await prisma.refreshToken.delete({
                where: { id: storedToken.id }
            });
            return res.status(401).json({ error: 'Refresh token expired' });
        }

        // Verify refresh token
        try {
            jwt.verify(refreshToken, process.env.JWT_SECRET);
        } catch (error) {
            await prisma.refreshToken.delete({
                where: { id: storedToken.id }
            });
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // Generate new tokens
        const tokens = generateTokens(storedToken.user);

        // Delete old refresh token
        await prisma.refreshToken.delete({
            where: { id: storedToken.id }
        });

        // Store new refresh token
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);

        await prisma.refreshToken.create({
            data: {
                token: tokens.refreshToken,
                userId: storedToken.user.id,
                expiresAt: refreshTokenExpiry
            }
        });

        res.json(tokens);
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ error: 'Token refresh failed' });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (refreshToken) {
            // Delete refresh token
            await prisma.refreshToken.deleteMany({
                where: { token: refreshToken }
            });
        }

        // Delete user sessions if authenticated
        if (req.user) {
            await prisma.session.deleteMany({
                where: { userId: req.user.id }
            });
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
        const oauthUser = req.user;

        // Find or create user
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: oauthUser.email },
                    {
                        provider: oauthUser.provider,
                        providerId: oauthUser.providerId
                    }
                ]
            }
        });

        if (!user) {
            // Create new user
            user = await prisma.user.create({
                data: {
                    email: oauthUser.email,
                    name: oauthUser.name,
                    provider: oauthUser.provider,
                    providerId: oauthUser.providerId,
                    avatar: oauthUser.avatar,
                    emailVerified: true,
                    role: 'user'
                }
            });
        } else {
            // Update existing user
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    name: oauthUser.name,
                    avatar: oauthUser.avatar,
                    emailVerified: true
                }
            });
        }

        // Generate tokens
        const tokens = generateTokens(user);

        // Store refresh token
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);

        await prisma.refreshToken.create({
            data: {
                token: tokens.refreshToken,
                userId: user.id,
                expiresAt: refreshTokenExpiry
            }
        });

        // Create session
        const sessionExpiry = new Date();
        sessionExpiry.setDate(sessionExpiry.getDate() + 7);

        await prisma.session.create({
            data: {
                userId: user.id,
                token: tokens.accessToken,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
                expiresAt: sessionExpiry
            }
        });

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
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                provider: true,
                avatar: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            // Don't reveal if user exists
            return res.json({ message: 'If the email exists, a reset link has been sent' });
        }

        // TODO: Generate reset token and send email
        // For now, just return success
        res.json({ message: 'If the email exists, a reset link has been sent' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // TODO: Verify reset token and update password
        res.status(501).json({ message: 'Password reset not fully implemented yet' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};

// Clean up expired tokens (should be run periodically)
exports.cleanupExpiredTokens = async () => {
    try {
        const now = new Date();

        // Delete expired refresh tokens
        await prisma.refreshToken.deleteMany({
            where: {
                expiresAt: {
                    lt: now
                }
            }
        });

        // Delete expired sessions
        await prisma.session.deleteMany({
            where: {
                expiresAt: {
                    lt: now
                }
            }
        });

        console.log('Expired tokens cleaned up successfully');
    } catch (error) {
        console.error('Token cleanup error:', error);
    }
};
