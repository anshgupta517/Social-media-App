import express from "express";
import { createPost, getPosts, getAllPosts } from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getPosts);
router.get("/all", getAllPosts);

export default router;
