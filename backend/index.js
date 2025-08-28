// import package
import express from "express"
import {config} from "dotenv"


// import files
import { connectDb } from "./src/db/db.js";

// middlewares
const app = express();
config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const port = process.env.PORT || 5000

app.listen(port, ()=>{
    connectDb()
    console.log(`server is running on this ${port}`)
})