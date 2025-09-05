import express from "express"
import multer from "multer"
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();



export default router;