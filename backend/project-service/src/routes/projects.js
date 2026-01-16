const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticateJWT, requireRole } = require('../middleware/auth');
const { validateProject } = require('../middleware/validators');
const rateLimiter = require('../middleware/rateLimiter');

// Public routes
router.get('/', rateLimiter, projectController.getAllProjects);
router.get('/trending', rateLimiter, projectController.getTrendingProjects);
router.get('/:slug', rateLimiter, projectController.getProjectBySlug);
router.post('/:id/download', rateLimiter, projectController.incrementDownload);

// Protected routes
router.post('/', authenticateJWT, validateProject, projectController.createProject);
router.put('/:id', authenticateJWT, validateProject, projectController.updateProject);
router.delete('/:id', authenticateJWT, projectController.deleteProject);
router.post('/:id/favorite', authenticateJWT, projectController.toggleFavorite);
router.get('/user/favorites', authenticateJWT, projectController.getUserFavorites);

module.exports = router;
