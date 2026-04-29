// routes/propertyRoutes.js
import express from 'express';
import { createProperty, getPropertyById, deleteProperty, getAllProperties } from '../controllers/propertyController.js';

import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateId } from '../middleware/validateId.js';
import { validateCreateProperty } from '../middleware/validateProperty.js';

const router = express.Router();

router.post(
  '/', 
  authenticateToken, 
  authorizeRoles('ADMIN', 'MANAGER'), 
  validateCreateProperty, 
  createProperty
);
router.get('/',getAllProperties);

// 1. Logged in? -> 2. Is the URL ID a number? -> 3. Fetch it
router.get(
  '/:id', 
  authenticateToken, 
  validateId, 
  getPropertyById
);

// DELETE A PROPERTY
router.delete(
  '/:id', 
  authenticateToken, 
  authorizeRoles('ADMIN'), 
  validateId, 
  deleteProperty
);

router.put(':id', authenticateToken, authorizeRoles('ADMIN'), validateId, validateCreateProperty, updateProperty);
export default router;