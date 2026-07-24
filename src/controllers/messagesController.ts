import type { Request, Response } from 'express';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.body;
        if (!chatId) {
            return res.status(400).json({ message: 'Chat ID is required'})
        };
        const messages = await Message.find({
            chat: chatId,
        }).sort({
            createdAt: 1,
        }).populate('sender', 'name');

        return res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error'});
    }
}

export const createMessage = async (req: Request, res: Response) => {
    try {
        const senderId = req.user?.userId;
        const { chatId, text } = req.body;

        if (!senderId) {
            return res.status(401).json({ message: 'Unauthorized'})
        };
        if (!chatId || !text) {
            return res.status(400).json({ message: 'Chat ID and text are required'})
        };

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found'})
        };

        const message = new Message({
            chat: chatId,
            sender: senderId,
            text,
        });
        await message.save();

        return res.status(201).json(message);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error'});
    }
}