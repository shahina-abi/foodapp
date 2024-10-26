// routes/adminRoutes.js
import express from 'express';
import { loginAdmin, getAllUsers,adminProfile,checkAdmin,adminLogout } from '../controllers/adminController.js';
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

// Admin login route
router.post('/login', loginAdmin);

// Protected routes (only admins can access)
router.get('/users', getAllUsers);

router.get("/profile", authAdmin,adminProfile);

// router.put("/profile-update", mentorProfile);
router.put("/profile-update", authAdmin, (req, res, next) => {});

router.delete("/profile-delete", (req, res, next) => {});

router.post("/log-out",authAdmin,adminLogout);

router.get("/check-mentor", authAdmin, checkAdmin);


export default router;
