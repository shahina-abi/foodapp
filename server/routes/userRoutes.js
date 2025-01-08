
import express from 'express';
import { registerUser, userLogin, checkUser, userLogout, userProfile } from '../controllers/userController.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', userLogin);
router.get('/profile', authUser, userProfile);

router.get('/check', authUser, checkUser); // This should match /api/auth/check
router.post('/log-out', authUser, userLogout);

export default router;
