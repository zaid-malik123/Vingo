import express from "express"
import multer from "multer"
import { createShop } from "../controllers/shop.controller.js";
import { isAuth } from "../middleware/isAuth.js";
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();

router.post("/create",isAuth,upload.single("image"),createShop)

export default router;