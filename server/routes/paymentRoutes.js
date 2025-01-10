import express from 'express';
import {authUser} from "../middleware/authUser.js"

import  {creatCheckout,sectionStatus } from "../controllers/paymentController.js"

const router = express.Router();

router.post("/create-checkout-session", authUser,creatCheckout)
router.get("/session-status",sectionStatus)







export default router;