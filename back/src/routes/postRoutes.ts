import express from 'express';
import { createPost } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, createPost);

export default router;