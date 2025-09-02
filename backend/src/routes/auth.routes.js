import express from "express"
import { login, logout, resetPassword, sendOtp, signup, verifyOtp } from "../controllers/auth.controller.js";
const router = express.Router();


router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp)
router.post("/reset-password", resetPassword)

export default router;