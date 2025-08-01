import mongoose from "mongoose";

const DBNAME = "Tinder"
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DBNAME}`
        )
        console.log(`\n MongoDB connected ! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection failed...");
        process.exit(1);
    }
}
export default connectDB;