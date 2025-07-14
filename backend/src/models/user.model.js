import mongoose from "mongoose";
import validator, { trim } from "validator"
import APIError from "../utils/APIError";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:[true,"FirstName is required"],
        minlength: [2, "First name must be at least 2 characters long"],
        maxlength: [50, "First name cannot exceed 50 characters"]
    },
    lastName:{
        type:String,
        trim:true,
        maxlength: [50, "Last name cannot exceed 50 characters"]
    },
    emailId:{
        type:String,
        required: [true, "Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
        validate:{
            validator:validator.isEmail,
            message:"Please provide a valid email",
        }
    },
    password:{
        type:String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [50, "Password cannot exceed 50 characters"],

        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new APIError(400,"Please enter a strong password");
            }
        },
    },
    age:{
        type:Number,
        min: [18, "You must be at least 18 years old"],
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        default:"male"
    },
    about:{
        type:String,
        trim:true,
        maxlength: [300, "About section can't be longer than 300 characters"],
        default: "This is the description about user..."
    },
    skills:{
        type:[String],
        validate:{
            validator: (arr) => Array.isArray(arr) && arr.every((skill)=>{ validator.isAlphanumeric(skill.replace(/\s/g, ""), "en-US")}),
            message:"Skills must be in alphanumeric words"
        }
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);