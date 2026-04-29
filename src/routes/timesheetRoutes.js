// routes/timesheetRoutes.js
import express from 'express';
import { createTimesheet, getTimesheetById, deleteTimesheet, getAllTimesheets, updateTimesheet } from '../controllers/timesheetController.js';

import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateId } from '../middleware/validateId.js';
import { validateCreateTimesheet } from '../middleware/validateTimesheet.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER', 'PORTER'),
  validateCreateTimesheet,
  createTimesheet
);
router.get('/', authenticateToken, getAllTimesheets);

// 1. Logged in? -> 2. Is the URL ID a number? -> 3. Fetch it
router.get(
  '/:id',
  authenticateToken,
  validateId,
  getTimesheetById
);

// DELETE A TIMESHEET
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  validateId,
  deleteTimesheet
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER'),
  validateId,
  validateCreateTimesheet,
  updateTimesheet
);

export default router;