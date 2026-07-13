import express from 'express';
const router = express.Router();

import authRouter from './authRoute.js';
import chatsRouter from './chatsRoute.js';

router.use('/', authRouter);
router.use('/api/chats', chatsRouter);

export default router;