import express from 'express';
import { validateSignUp, validateLogin } from '../middleware/userValidation.js';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', validateSignUp, signUpHandler);
router.post('/login', validateLogin, logInHandler);
export default router;
