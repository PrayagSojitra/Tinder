import { User } from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const viewProfile = asyncHandler(async(req,res)=>{
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password')

    if(!user){
        throw new APIError(400,"User not found!")
    }

    return res
    .status(200)
    .json( new APIResponse(200,user,"User details fetched successfully"))
})

const editProfile = asyncHandler(async(req,res)=>{
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password')

    if(!user){
        throw new APIError(400,"User not found!")
    }
    
    const allowedFields = ["firstName","lastName","age","gender","about","skills","photoURL"];
    const updateData = {}

    allowedFields.forEach((field)=>{
        if(req.body[field] !== undefined){
            updateData[field] = req.body[field]
        }
    })

    if(Object.keys(updateData).length === 0){
        throw new APIError(400,"Please provide a valid field for updates");
    }

    const updatedUser = await User.findByIdAndUpdate(userId,updateData,{ runValidators:true,new:true}).select("-password");

    return res
    .json(
        new APIResponse(200,updatedUser,"User deatails updated successfully")
    )
})

const updatePassword = asyncHandler(async(req,res)=>{

    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user){
        throw new APIError(400,"User does not exist");
    }

    const{oldPass,newPass} = req.body;

    if(!oldPass){
        throw new APIError(400,"Old Password is needed!");
    }
    if(!newPass){
        throw new APIError(400,"Please Provide new Password");
    }

    const isValidPass = await user.isPassCorrect(oldPass);
    if (!isValidPass) {
        throw new APIError(401, "Invalid Credentials");
    }

    user.password = newPass;
    user.save()

    return res
    .json(
        new APIResponse(200,null,"Password Updated Successfully")
    )
})

export {
    viewProfile,
    editProfile,
    updatePassword
}