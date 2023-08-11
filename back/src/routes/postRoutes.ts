import express from 'express';
import { createPost, getAllPosts, getMyPosts } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/all', authMiddleware, getAllPosts);
router.get('/me', authMiddleware, getMyPosts);
router.post('/create', authMiddleware, createPost);

export default router;