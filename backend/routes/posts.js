import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getPosts);

export default router;
