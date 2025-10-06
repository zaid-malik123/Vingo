// import package
import express from "express"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import http from "http"

// import files
import { connectDb } from "./src/db/db.js";
import authRoute from "./src/routes/auth.routes.js"
import userRoute from "./src/routes/user.routes.js"
import shopRoute from "./src/routes/shop.routes.js"
import itemRoute from "./src/routes/item.routes.js"
import orderRoute from "./src/routes/order.routes.js"
import { Server } from "socket.io";
import { socketHandler } from "./src/socket.js";

const app = express();
const server = http.createServer(app)
config();

// socket setup
const io = new Server(server,{
    cors: {
        origin: "https://vingo-vv4n.onrender.com",
        credentials: true,
        methods: ["POST", "GET"]
    }
})
app.set("io", io)

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: "https://vingo-vv4n.onrender.com",
    credentials: true
}))

// routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/shop", shopRoute)
app.use("/api/item", itemRoute)
app.use("/api/order", orderRoute)

socketHandler(io)
const port = process.env.PORT || 5000

server.listen(port, ()=>{
    connectDb()
    console.log(`server is running on this ${port}`)
})