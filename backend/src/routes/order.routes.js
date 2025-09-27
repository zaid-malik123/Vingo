import express from "express"
import { isAuth } from "../middleware/isAuth.js";
import {   acceptAssingment, getAssigment, getCurrentOrder, getMyOrders, placeOrder, updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", isAuth, placeOrder)

router.get("/my-orders", isAuth, getMyOrders)

router.get("/get-assignments", isAuth, getAssigment)

router.get("/accept-order/:id", isAuth, acceptAssingment)

router.get("/current-order", isAuth, getCurrentOrder)

router.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus)


export default router;