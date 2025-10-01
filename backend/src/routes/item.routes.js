import express from "express"
import multer from "multer"
import { isAuth } from "../middleware/isAuth.js";
import { addItem, deleteItem, editItem, findSingleItem, getItemByCity, getItemsByShop } from "../controllers/item.controller.js";
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();

router.post("/create-item",isAuth,upload.single("image"), addItem)

router.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)

router.get("/delete-item/:itemId",isAuth,deleteItem)

router.get("/get-single-item/:itemId",isAuth,findSingleItem)

router.get("/get-item-by-city/:city",isAuth, getItemByCity)

router.get("/get-by-shop/:shopId",isAuth, getItemsByShop)

export default router;