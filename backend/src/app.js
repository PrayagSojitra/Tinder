import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js"

//routes declaration
app.use("/api/v1",authRoutes);
app.use("/api/v1",profileRoutes);

export default app;