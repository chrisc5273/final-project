import Prisma from '../config/db.js';
import { handleValidationErrors } from './handleValidation.js';
import { body } from 'express-validator';

export const validateSignUp = [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .bail()
      .isString()
      .withMessage('Name must be text')
      .isLength({ max: 255 })
      .withMessage('Name cannot exceed 255 characters'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .bail()
      .isEmail()
      .withMessage('Email is not valid')
      .bail()
      .normalizeEmail()
      .custom(async (email) => {
        const existingUser = await Prisma.users.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (existingUser) {
          throw new Error('Email already exists.');
        }

        return true;
      }),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .bail()
      .isLength({ min: 8, max: 64 })
      .withMessage('Password must contain at least 8 characters and at most 64 characters'),

    body('role')
        .optional()
        .isIn(['PORTER', 'MANAGER', 'ADMIN', 'USER'])
        .withMessage('Role must be one of PORTER, MANAGER, ADMIN, or USER'),

    handleValidationErrors,
];

export const validateLogin = [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .bail()
      .isEmail()
      .withMessage('Email is not valid')
      .bail()
      .normalizeEmail(),

    body('password')
      .notEmpty()
      .withMessage('Password is required'),

    handleValidationErrors,
];

export const validateCreateUser = [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required.')
      .bail()
      .isString()
      .withMessage('Name must be text.')
      .isLength({ max: 255 })
      .withMessage('Name cannot exceed 255 characters.'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required.')
      .bail()
      .isEmail()
      .withMessage('Email is not valid.')
      .bail()
      .normalizeEmail()
      .custom(async (email) => {
        const existingUser = await Prisma.users.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (existingUser) {
          throw new Error('Email already exists.');
        }

        return true;
      }),

    body('password')
      .notEmpty()
      .withMessage('Password is required.')
      .bail()
      .isLength({ min: 8, max: 64 })
      .withMessage('Password must contain at least 8 characters and at most 64 characters'),

    body('phonenumber')
      .optional()
      .isString()
      .withMessage('Phone number must be text.')
      .isLength({ max: 50 })
      .withMessage('Phone number cannot exceed 50 characters.'),

    body('role')
      .optional()
      .isIn(['PORTER', 'MANAGER', 'ADMIN', 'USER'])
      .withMessage('Role must be one of PORTER, MANAGER, ADMIN, or USER'),

    handleValidationErrors,
];

export const validateUpdateUser = [
    body('name')
      .optional()
      .trim()
      .isString()
      .withMessage('Name must be text.')
      .isLength({ max: 255 })
      .withMessage('Name cannot exceed 255 characters.'),

    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Email is not valid.')
      .normalizeEmail(),

    body('password')
      .optional()
      .isLength({ min: 8, max: 64 })
      .withMessage('Password must contain at least 8 characters and at most 64 characters'),

    body('phonenumber')
      .optional()
      .isString()
      .withMessage('Phone number must be text.')
      .isLength({ max: 50 })
      .withMessage('Phone number cannot exceed 50 characters.'),

    body('role')
      .optional()
      .isIn(['PORTER', 'MANAGER', 'ADMIN', 'USER'])
      .withMessage('Role must be one of PORTER, MANAGER, ADMIN, or USER'),

    handleValidationErrors,
];