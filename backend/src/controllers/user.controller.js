import asyncHandler from "../utils/asyncHandler.js"
import APIError from "../utils/APIError.js"
import APIResponse from "../utils/APIResponse.js"
import {User} from "../models/user.model.js"
// import userModel from "../models/user.model.js"

const userRegister = asyncHandler(async(req,res)=>{
    const {firstName,lastName,emailId,password,gender,age,about,skills} = req.body;

    if(!firstName){
        throw new APIError(400,"FirstName is Required!!");
    }
    if(!emailId){
        throw new APIError(400,"EmailId is Required!!");
    }
    if (!password) {
        throw new APIError(400, "password is required");
    }

    const existedUser = await User.findOne({emailId});
    if(existedUser){
        throw new APIError(409,"User with this email already existed!!");
    }

    const user = await User.create({
        firstName,
        lastName,
        emailId,
        gender,
        age,
        about,
        skills
    })

    const createdUser = await User.findById(emailId).select("-password");

    if(!createdUser){
        throw new APIError(500,"Something went wrong while creating a user");
    }

    // const tokenssss

    return res
    .status(201)
    .json( new APIResponse(200,createdUser,"USer registerd successfully..."))
    // .cookie
})

export {
    userRegister,
}