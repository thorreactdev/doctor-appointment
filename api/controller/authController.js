import User from "../models/userSchema.js";
import { errorHandler } from "../utils/erroHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpController = async (req, res, next) => {
  try {
    const { name, email, password, gender, role } = req.body;
    if (!name || !email || !password || !gender || !role || password === "") {
      return next(errorHandler(400, "Please Fill All Fields"));
    }
    const userData = await User.find();
    // checks whether username already taken or not
    const isUserNameTaken = userData?.some((user) => user?.name === name);
    if (isUserNameTaken) {
      return next(errorHandler(400, "Username is already taken"));
    }
    // Checks whether password is greater than 8 characters or not
    if (password?.length < 8 || password?.length > 15) {
      return next(errorHandler(400, "Password must be 8 characters long"));
    }
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!regex.test(email)) {
      return next(errorHandler(400, "Invalid Email"));
    }
    const hashPassword = bcryptjs.hashSync(password, 15);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      gender,
      role,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration Successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res, next) => {
    const { email , password } = req.body;
    if(!email || !password){
        return next(errorHandler(400 , "Please Fill All Fields"));
    }
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!regex.test(email)) {
      return next(errorHandler(400, "Invalid Email"));
    }
    const existingUser = await User.findOne({ email });
    if(!existingUser){
        return next(errorHandler(404 , "Please Create an account"));
    }
    const isPasswordCorrect = bcryptjs.compareSync(password , existingUser.password);
    if(!isPasswordCorrect){
        return next(errorHandler(400 , "Invalid Password"));
    }
    const token = jwt.sign({id : existingUser._id , role : existingUser.role} , process.env.JWT_SECRET);
    console.log(token);
    const { password : pass , ...rest} = existingUser._doc;
    res.status(200).cookie("token" , token , {
        httpOnly : true,
        expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    }).json({
        success : true,
        message : "Login Successfull",
        user : rest
    });
    
};

export const checkAlreadyGoogleUser = async(req, res, next)=>{
  const { email } = req.body;
  try {
    const alreadyGoogleUser = await User.findOne({ email });
    if (alreadyGoogleUser?.gender && alreadyGoogleUser?.role) {
      const token = jwt.sign({id : alreadyGoogleUser._id , role : alreadyGoogleUser.role} , process.env.JWT_SECRET);
      console.log(token);
      const { password : pass , ...rest } = alreadyGoogleUser._doc;
      return res.status(200).cookie("token" , token , {
        httpOnly : true,
        expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      }).json({
        success : true,
        message : `Welcome ${alreadyGoogleUser?.name}`,
        user : rest,
        hasProfileCompleted : true
      });
    }
    return res.status(200).json({ hasProfileCompleted: false });
    
  } catch (error) {
    next(error);
  }
};

export const newGoogleUser = async(req,res,next)=>{
  try {
    const { email , name , gender , role , avatar } = req.body;
    const generatePassword = Math.random().toString(36).slice(-8);
    console.log(generatePassword);
    const hashPassword = bcryptjs.hashSync(generatePassword, 15);
    const newUser = new User({
      name : name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
      email,
      password: hashPassword,
      gender,
      role,
      avatar
    });
    await newUser.save();
    const token = jwt.sign({ id : newUser._id , role : newUser.role } , process.env.JWT_SECRET);
    const { password : pass , ...rest } = newUser._doc;
    res.status(200).cookie("token" , token , { 
      httpOnly : true,
      expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    }).json({
      success : true,
      message : `Welcome ${newUser?.name}`,
      user : rest
    });
  } catch (error) {
    next(error);
  }
}
