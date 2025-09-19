import express from "express"
import { isAuth } from "../middleware/isAuth.js";
import { placeOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", isAuth, placeOrder)


export default router;