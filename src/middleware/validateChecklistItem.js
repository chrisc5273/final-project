import { body, validationResult } from 'express-validator';
import { handleValidationErrors } from './handleValidation.js';

export const validateCreateChecklistItem = [
  // 1. propertyid is required and must be an integer
  body('propertyid')
    .notEmpty().withMessage('Property ID is required.')
    .isInt().withMessage('Property ID must be a number.'),

  // 2. taskdescription is required and must be a string
  body('taskdescription')
    .notEmpty().withMessage('Task description is required.')
    .isString().withMessage('Task description must be text.'),

  // 3. isactive is optional, but if provided, must be a boolean
  body('isactive')
    .optional()
    .isBoolean().withMessage('Is active must be true or false.'),

  handleValidationErrors
];