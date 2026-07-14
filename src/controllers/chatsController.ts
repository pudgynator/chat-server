import type { Request, Response } from "express";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const getChats = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const chats = await Chat.find({
            members: userId,
        }).populate('members', 'name phone');

        res.status(200).json(chats);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createChat = async (req: Request, res: Response) => {
    try {
        const currentUserId = req.user?.userId;
        const { userId } = req.body;

        if (!currentUserId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (currentUserId === userId) {
            return res.status(400).json({ message: "Cannot create a chat with yourself" });
        }

        const otherUser = await User.findById(userId);
        if (!otherUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const existChat = await Chat.findOne({
            members: {
                $all: [currentUserId, userId]
            }
        })

        if (existChat) {
            return res.status(200).json(existChat);
        }

        const chat = new Chat( {
            members: [
                currentUserId,
                userId,
            ],
        })

        await chat.save();
        return res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};