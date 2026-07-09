import express from 'express';
const router = express.Router();

import authRouter from './authRoute.js';
import registerRouter from './registerRoute.js';

router.use('/api/auth', authRouter);
router.use('/api/register', registerRouter);

export default router;