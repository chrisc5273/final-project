// routes/checklistSubmissionRoutes.js
import express from 'express';
import { createChecklistSubmission, getChecklistSubmissionById, deleteChecklistSubmission, getAllChecklistSubmissions, updateChecklistSubmission } from '../controllers/checklistSubmissionController.js';

import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateId } from '../middleware/validateId.js';
import { validateCreateChecklistSubmission } from '../middleware/validateChecklistSubmission.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER', 'PORTER'),
  validateCreateChecklistSubmission,
  createChecklistSubmission
);
router.get('/', authenticateToken, getAllChecklistSubmissions);

// 1. Logged in? -> 2. Is the URL ID a number? -> 3. Fetch it
router.get(
  '/:id',
  authenticateToken,
  validateId,
  getChecklistSubmissionById
);

// DELETE A CHECKLIST SUBMISSION
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  validateId,
  deleteChecklistSubmission
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER'),
  validateId,
  validateCreateChecklistSubmission,
  updateChecklistSubmission
);

export default router;