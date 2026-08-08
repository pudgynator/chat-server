import express  from "express";
import { getChats, createChat, createGroup } from "../controllers/chatsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/', authMiddleware, getChats);
router.post('/',authMiddleware, createChat);
router.post('/group', authMiddleware, createGroup)

export default router;