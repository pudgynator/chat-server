import express  from "express";
import { getChats, createChat } from "../controllers/chatsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/', authMiddleware, getChats);
router.post('/',authMiddleware, createChat);

export default router;