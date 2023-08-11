import express from 'express';
import userRoutes from './userRoutes';

const router = express.Router();

// Sub-routes
router.use('/user', userRoutes);

export default router;