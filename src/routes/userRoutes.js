import express from 'express';
import * as userController from '../controllers/userController.js';
import { validateCreateUser } from '../middleware/validateId.js';
import { authenticate } from '../middleware/authenticateToken.js';
import { validateId } from '../middleware/validateId.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get(':id', valdiateId ,userController.getUserById);
router.post('/', authenticate ,validateCreateUser ,userController.createUser);
router.put(':id', authenticate ,validateId, userController.updateUser)
router.delete(':id',validateId, authenticate, authorizeRoles('ADMIN')
, userController.deleteUser );