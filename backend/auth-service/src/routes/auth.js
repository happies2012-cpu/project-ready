const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validators');
const { authenticate } = require('../middleware/jwt');

// Local authentication routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authenticate, authController.logout);

// Password reset
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/auth?error=google_auth_failed`
    }),
    authController.oauthCallback
);

// GitHub OAuth routes
router.get('/github',
    passport.authenticate('github', {
        scope: ['user:email'],
        session: false
    })
);

router.get('/github/callback',
    passport.authenticate('github', {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/auth?error=github_auth_failed`
    }),
    authController.oauthCallback
);

// Protected route example
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;
