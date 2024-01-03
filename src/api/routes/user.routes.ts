import express from "express";
import { signup, login, sendOTP } from "../controller/user.controller.js";
const router = express.Router();

router.post("/sign-up", signup);
router.post("/login", login);
router.post("/verify-email", sendOTP);

export default router;
