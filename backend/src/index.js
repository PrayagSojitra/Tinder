import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./config/db.js";

dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 9000,()=>{
        console.log(`Server is running on PORT:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed!!! : ",err);
})