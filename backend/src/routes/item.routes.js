import express from "express"
import multer from "multer"
import { isAuth } from "../middleware/isAuth.js";
import { addItem, editItem, findSingleItem } from "../controllers/item.controller.js";
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();

router.post("/create-item",isAuth,upload.single("image"), addItem)

router.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)

router.get("/get-single-item/:itemId",isAuth,findSingleItem)

export default router;