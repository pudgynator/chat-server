import express from 'express'
const router = express.Router();

import registerRouter from './registerRoute.js';
import loginRouter from './loginRoute.js';

router.use('/api/register', registerRouter);
router.use('/api/login', loginRouter);

export default router;