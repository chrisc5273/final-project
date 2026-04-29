import { body, validationResult } from 'express-validator';
import { handleValidationErrors } from './handleValidation';
export const validateCreateProperty = [
  // 1. Name is required and must be a string
  body('name')
    .notEmpty().withMessage('Property name is required.')
    .isString().withMessage('Property name must be text.')
    .isLength({ max: 255 }).withMessage('Name cannot exceed 255 characters.'),

  // 2. Address is required
  body('address')
    .notEmpty().withMessage('Property address is required.')
    .isString().withMessage('Address must be text.'),

  // 3. Start time is optional, but if provided, must be a string
  body('starttime')
    .optional()
    .isString().withMessage('Start time must be text.'),

  handleValidationErrors
];