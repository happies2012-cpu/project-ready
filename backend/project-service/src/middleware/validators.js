const { body } = require('express-validator');

exports.validateProject = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .isLength({ min: 10, max: 5000 })
        .withMessage('Description must be between 10 and 5000 characters'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('techStack')
        .optional()
        .isArray()
        .withMessage('Tech stack must be an array')
];
