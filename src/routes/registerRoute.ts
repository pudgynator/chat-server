import express from 'express';
import { createUser } from "../controllers/registerController.js";

const router = express.Router();

router.post('/', (req, res, next) => {
    console.log("POST /api/register");
    next();
}, createUser);

export default router;