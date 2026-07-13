import type { Request, Response } from "express";
import Chat from "../models/Chat.js";

export const getChats = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const chats = await Chat.find({
            members: userId,
        }).populate('members', 'name phone');

        // const response = chats.map((chat) => {
        //     const otherUser = chats.members.find((member) => {
        //         return member._id.toString() !== userId;
        //     })

        //     return {
        //         id: chat._id,
        //         name: otherUser?.name,
        //         phone: otherUser?.phone,
        //     };
        // });

        res.status(200).json(chats);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createChat = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const chat = new Chat( {
            members: [
                req.user?.userId,
                userId,
            ],
        })

        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};