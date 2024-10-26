import express from 'express';
import { registerUser, userLogin,checkUser, userLogout, userProfile,} from '../controllers/userController.js';
import { authUser } from '../middleware/authUser.js';
const router = express.Router();

router.post('/register', registerUser);

router.post('/login',userLogin);

router.get("/profile", authUser, userProfile);

router.put("/profile-update", authUser, (req, res, next) => {});

router.delete("/profile-delete",authUser, (req, res, next) => {});

router.post("/log-out", authUser, userLogout);

router.get("/check-user", authUser,checkUser);


export default router;
 