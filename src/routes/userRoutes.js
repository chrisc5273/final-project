import express from 'express';
import * as userController from '../controllers/userController.js';
import { validateCreateUser, validateUpdateUser } from '../middleware/userValidation.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { validateId } from '../middleware/validateId.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('ADMIN'), userController.getAllUsers);
router.get('/:id', authenticateToken, validateId, userController.getUserById);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), validateCreateUser, userController.createUser);
router.put('/:id', authenticateToken, validateId, authorizeRoles('ADMIN', 'MANAGER'), validateUpdateUser, userController.updateUser);
router.delete('/:id', authenticateToken, validateId, authorizeRoles('ADMIN'), userController.deleteUser);

export default router;