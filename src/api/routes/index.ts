import express from "express";
import { errorMiddleware } from "../middleware/error.js";
const router = express.Router();

/*
##################### Error Middleware ##########################
*/
router.use(errorMiddleware);

export default router;
