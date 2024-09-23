import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },

    gender : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    role : {
        type : String,
        required : true,
        enum : ["patient" , "doctor" , "admin"]
    }
},{ timestamps : true });

const User = mongoose.model("User" , userSchema);

export default User;