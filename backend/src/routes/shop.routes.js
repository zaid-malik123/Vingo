import express from "express"
import multer from "multer"
import { createShop, getMyShop } from "../controllers/shop.controller.js";
import { isAuth } from "../middleware/isAuth.js";
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();

router.post("/create-edit",isAuth,upload.single("image"),createShop)

router.get("/get-my",isAuth,getMyShop)

export default router;