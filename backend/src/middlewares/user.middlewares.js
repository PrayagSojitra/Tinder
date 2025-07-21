import { User } from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const isAuthenticated = asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.token

    if(!token){
        throw new APIError(401,"You Are Not Authenticated")
    }

    try{
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET_KEY);

        const user = await User.findById(decoded._id);
        if(!user){
            throw new APIError(400,"Invalid token!");
        }

        req.user = user;
        next()
    }
    catch(err){
        throw new APIError(400,"Invalid Token : ",err.message);
    }
})

export{
    isAuthenticated
}