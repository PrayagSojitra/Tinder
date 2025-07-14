import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        default:"male"
    },
    about:{
        type:String,
        default:"this is the description about user..."
    },
    skills:{
        type:[String],
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);