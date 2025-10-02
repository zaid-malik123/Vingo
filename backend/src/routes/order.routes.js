import express from "express"
import { isAuth } from "../middleware/isAuth.js";
import {   acceptAssingment, getAssigment, getCurrentOrder, getMyOrders, getOrderById, placeOrder, sendDeliveryOtp, updateOrderStatus, verifyDeliveryOtp, verifyPayment } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", isAuth, placeOrder)

router.get("/my-orders", isAuth, getMyOrders)

router.get("/get-assignments", isAuth, getAssigment)

router.get("/accept-order/:id", isAuth, acceptAssingment)

router.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus)

router.get("/current-order", isAuth, getCurrentOrder)

router.get("/current-order", isAuth, getOrderById)

router.get("/get-order-by-id/:orderId", isAuth, getOrderById)

router.post("/send-delivery-otp", isAuth, sendDeliveryOtp)

router.post("/verify-delivery-otp", isAuth, verifyDeliveryOtp)

router.post("/verify-payment", isAuth, verifyPayment)


export default router;