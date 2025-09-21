import express from "express"
import { isAuth } from "../middleware/isAuth.js";
import { currUser, updateUserLocation } from "../controllers/user.controller.js";

const router = express();

router.get("/curr-user",isAuth, currUser)

router.post("/update-location", isAuth, updateUserLocation)

export default router