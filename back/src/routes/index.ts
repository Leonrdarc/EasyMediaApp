import express from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";

const router = express.Router();

// Sub-routes
router.use("/user", userRoutes);
router.use("/post", postRoutes);

export default router;
