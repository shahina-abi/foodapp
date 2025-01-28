
import express from 'express';
import { registerUser, userlogin, checkUser, userLogout, userProfile,editUserProfile } from '../controllers/userController.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', userlogin);
router.get('/profile', authUser, userProfile);

router.get('/check', authUser, checkUser); // This should match /api/auth/check
router.post('/log-out', authUser, userLogout);
router.put('/edit-profile', authUser, editUserProfile);

export default router;
