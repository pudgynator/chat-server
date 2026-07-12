import express from 'express';
const router = express.Router();

import authRouter from './authRoute.js';

router.use('/', authRouter);

export default router;