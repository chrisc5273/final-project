import { body, validationResult } from 'express-validator';
import { handleValidationErrors } from './handleValidation.js';

export const validateCreateTimesheet = [
  // 1. userid is required and must be an integer
  body('userid')
    .notEmpty().withMessage('User ID is required.')
    .isInt().withMessage('User ID must be a number.'),

  // 2. propertyid is required and must be an integer
  body('propertyid')
    .notEmpty().withMessage('Property ID is required.')
    .isInt().withMessage('Property ID must be a number.'),

  // 3. clockedin is required and must be a valid date
  body('clockedin')
    .notEmpty().withMessage('Clocked in time is required.')
    .isISO8601().withMessage('Clocked in must be a valid date.'),

  // 4. clockedout is optional, but if provided, must be a valid date
  body('clockedout')
    .optional()
    .isISO8601().withMessage('Clocked out must be a valid date.'),

  handleValidationErrors
];