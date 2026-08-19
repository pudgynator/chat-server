import express from 'express';
const router = express.Router();

import { getContacts, createContact, updateOrCreateContact } from '../controllers/contactsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/', authMiddleware, getContacts);
router.post('/', authMiddleware, createContact);
router.patch('/:targetUserId', authMiddleware, updateOrCreateContact)

export default router;