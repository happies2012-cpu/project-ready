const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateJWT, requireRole } = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

// Protected routes
router.post('/', authenticateJWT, rateLimiter, paymentController.createPayment);
router.post('/confirm', authenticateJWT, rateLimiter, paymentController.confirmPayment);
router.get('/user', authenticateJWT, paymentController.getUserPayments);
router.get('/:id', authenticateJWT, paymentController.getPayment);
router.post('/:id/refund', authenticateJWT, paymentController.requestRefund);

// Admin routes
router.get('/admin/stats', authenticateJWT, requireRole(['admin']), paymentController.getPaymentStats);

module.exports = router;
