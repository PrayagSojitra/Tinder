import mongoose from "mongoose";
import validator from "validator"
import APIError from "../utils/APIError.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


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
        minlength: [4, "Password must be at least 4 characters long"],
        maxlength: [50, "Password cannot exceed 50 characters"],

        // validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new APIError(400,"Please enter a strong password");
        //     }
        // },
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
        // validate:{
        //     validator: (arr) => Array.isArray(arr) && arr.every((skill)=>{ validator.isAlphanumeric(skill.replace(/\s/g, ""), "en-US")}),
        //     message:"Skills must be in alphanumeric words"
        // }
    },
    photoURL:{
        type:String,
        validate:{
            validator: function(val){
                return validator.isURL(val,{
                    protocols:['http','https'],
                    require_protocol:true,
                });
            },
            message: "URL is invalid !"
        }
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPassCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = async function(){
    return jwt.sign({
        _id:this._id,
        emailId:this.emailId,
        firstName:this.firstName,
        lastName:this.lastName,
        photoURL:this.photoURL,
        gender:this.gender,
    },process.env.TOKEN_SECRET_KEY,{expiresIn:"7d"})
}

export const User = mongoose.model("User",userSchema);