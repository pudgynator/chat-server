import express  from "express";
import { getChats, createChat, createGroup, editGroupName } from "../controllers/chatsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/', authMiddleware, getChats);
router.post('/',authMiddleware, createChat);
router.post('/group', authMiddleware, createGroup)
router.patch('/:chatId', authMiddleware, editGroupName)

export default router;