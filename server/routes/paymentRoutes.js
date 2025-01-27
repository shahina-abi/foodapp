// import express from 'express';
// import {authUser} from "../middleware/authUser.js"

// import  {createCheckout,sectionStatus } from "../controllers/paymentController.js"

// const router = express.Router();

// router.post("/create-checkout-session", authUser,createCheckout)
// router.get("/session-status",sectionStatus)







// export default router;
import express from "express";
import { authUser } from "../middleware/authUser.js";
import { createCheckout, sectionStatus} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", authUser, createCheckout);
router.get("/session-status", sectionStatus);
//router.get("/user/payment/success", authUser, handlePaymentSuccess);
//router.post("/store-order", authUser, storeOrder);

export default router;
