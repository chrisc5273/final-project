import { handleValidationErrors } from "./handleValidation.js";
import { body } from 'express-validator';

export const validateSignUp = [
    body('email')
      .trim()
      .notEmpty() // Upgraded from exists()
      .withMessage('Email is required')
      .bail()
      .isEmail()
      .withMessage('Email is not valid')
      .bail()
      .normalizeEmail(),

    body('password')
      .notEmpty() // Upgraded from exists()
      .withMessage('Password is required')
      .bail()
      .isLength({ min: 8, max: 64 })
      .withMessage('Password must contain at least 8 characters and at most 64 characters'),

    body('role')
        .optional()
        .isIn(['USER', 'ADMIN'])
        .withMessage('Role must be either USER or ADMIN'),

    handleValidationErrors,
];

export const validateLogin = [
    body('email')
      .trim()
      .notEmpty() // Upgraded to notEmpty for consistency
      .withMessage('Email is required')
      .bail()
      .isEmail() // Added to prevent useless database queries
      .withMessage('Email is not valid')
      .bail()
      .normalizeEmail(),

    body('password')
      .notEmpty() // Upgraded for consistency
      .withMessage('Password is required'),

    handleValidationErrors,
];