import express from 'express';
const router = express.Router();

import registerRouter from './registerRoute.js';

router.use('/api/register', registerRouter);

export default router;