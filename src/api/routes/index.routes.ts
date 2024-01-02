import express from "express";
import { errorMiddleware } from "../middleware/error.js";
import userRoutes from "./user.routes.js";
const router = express.Router();

/*
##################### User Routes ##########################
*/

router.use("/api/v1/user", userRoutes);

/*
##################### Error Middleware ##########################
*/
router.use(errorMiddleware);

export default router;
