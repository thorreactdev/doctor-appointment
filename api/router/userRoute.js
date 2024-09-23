import express from "express";
import { signOutUser } from "../controller/userController.js";
const router = express.Router();

router.route("/signout").post(signOutUser);

export default router;