import express from "express";
import { createMessage, getMessages } from "../controllers/messagesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/:chatId', authMiddleware, getMessages)
router.post('/', authMiddleware, createMessage)


export default router;