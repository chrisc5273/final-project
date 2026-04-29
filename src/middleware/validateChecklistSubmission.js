import { body, validationResult } from 'express-validator';
import { handleValidationErrors } from './handleValidation.js';

export const validateCreateChecklistSubmission = [
  // 1. timesheetid is required and must be an integer
  body('timesheetid')
    .notEmpty().withMessage('Timesheet ID is required.')
    .isInt().withMessage('Timesheet ID must be a number.'),

  // 2. checklistitemid is required and must be an integer
  body('checklistitemid')
    .notEmpty().withMessage('Checklist item ID is required.')
    .isInt().withMessage('Checklist item ID must be a number.'),

  // 3. photourl is required and must be a string
  body('photourl')
    .notEmpty().withMessage('Photo URL is required.')
    .isString().withMessage('Photo URL must be text.'),

  // 4. completedat is required and must be a valid date
  body('completedat')
    .notEmpty().withMessage('Completed at is required.')
    .isISO8601().withMessage('Completed at must be a valid date.'),

  handleValidationErrors
];