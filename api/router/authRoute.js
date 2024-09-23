import express from "express";
import { checkAlreadyGoogleUser, loginController, newGoogleUser, signUpController } from "../controller/authController.js";

const router = express.Router();
router.route("/signup").post(signUpController);
router.route("/login").post(loginController);
router.route("/auth/check-already-google-user").post(checkAlreadyGoogleUser);
router.route("/auth/new-google-user").post(newGoogleUser);

export default router;
