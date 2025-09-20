import express from "express"
import { isAuth } from "../middleware/isAuth.js";
import {   getMyOrders, placeOrder, updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", isAuth, placeOrder)

router.get("/my-orders", isAuth, getMyOrders)

router.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus)


export default router;