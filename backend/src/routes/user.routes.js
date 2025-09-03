import express from "express"
import { isAuth } from "../middleware/isAuth.js";
import { currUser } from "../controllers/user.controller.js";

const router = express();

router.get("/curr-user",isAuth, currUser)

export default router