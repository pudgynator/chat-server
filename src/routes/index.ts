import express from 'express';
const router = express.Router();

import authRouter from './authRoute.js';
import chatsRouter from './chatsRoute.js';
import contactsRouter from './contactsRoute.js';
import messagesRouter from './messagesRoute.js'
import userRouter from './userRoute.js'

router.use('/', authRouter);
router.use('/api/chats', chatsRouter);
router.use('/api/contacts', contactsRouter);
router.use('/api/messages', messagesRouter)
router.use('/api/profile', userRouter);

export default router;