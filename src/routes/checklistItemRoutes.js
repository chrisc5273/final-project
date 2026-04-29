// routes/checklistItemRoutes.js
import express from 'express';
import { createChecklistItem, getChecklistItemById, deleteChecklistItem, getAllChecklistItems, updateChecklistItem } from '../controllers/checklistItemController.js';

import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateId } from '../middleware/validateId.js';
import { validateCreateChecklistItem } from '../middleware/validateChecklistItem.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorizeRoles('ADMIN', 'MANAGER'),
  validateCreateChecklistItem,
  createChecklistItem
);
router.get('/', authenticateToken, getAllChecklistItems);

// 1. Logged in? -> 2. Is the URL ID a number? -> 3. Fetch it
router.get(
  '/:id',
  authenticateToken,
  validateId,
  getChecklistItemById
);

// DELETE A CHECKLIST ITEM
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  validateId,
  deleteChecklistItem
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  validateId,
  validateCreateChecklistItem,
  updateChecklistItem
);

export default router;