import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoute from "./router/authRoute.js";
import userRoute from "./router/userRoute.js";

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Db Connected")).catch((err)=> console.log(err));
const app = express();
app.use(express.json());


app.use("/api" , authRoute);
app.use("/api" , userRoute);


app.listen(3000 , ()=> console.log("Server Started"));

// error middleware

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

