import express from 'express'
import { loginUser } from '../controllers/loginController.js';
const router = express.Router();

router.post('/', (req, res, next) => {
    console.log("POST /api/register");
    next();
}, loginUser)

export default router;