import type { Request, Response } from "express";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import Contact from "../models/Contact.js";
import Message from "../models/Message.js";
import { Types } from 'mongoose'

type PopulatedUser = {
    _id: string;
    name: string;
    phone: string;
    lastSeen: string | Date;
};

export const getChats = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const chats = await Chat.find({members: new Types.ObjectId(userId) } as any)
                .sort({ updatedAt: -1})
                .populate('members', 'name phone lastSeen');


        const result = await Promise.all(
            chats.map( async (chat) => {
                const members = chat.members as unknown as PopulatedUser[];

                const otherUser = members.find(
                    member => member._id.toString() !== userId
                );

                if (!otherUser) {
                    return null
                };
    
                const contact = await Contact.findOne({
                    owner: userId,
                    contact: otherUser?._id,
                });

                const unreadCount = await Message.countDocuments({
                    chat: chat._id,
                    sender: { $ne: userId },
                    read: false,
                });
    
                return {
                    id: chat._id,
                    name: contact?.name ?? otherUser?.name,
                    phone: otherUser?.phone,
                    lastMessage: (chat as any).lastMessage ?? '',
                    lastSeen: otherUser.lastSeen ?? null,
                    lastMessageSender: (chat as any).lastMessageSender ?? '',
                    updatedAt: (chat as any).updatedAt,
                    members: chat.members,
                    unreadCount,
                }
            })
        )

        const filteredResult = result.filter(Boolean);
        res.status(200).json(filteredResult);
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

export const createGroup = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const currentUserId = new Types.ObjectId(userId);
        const { name, members } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Group name is required' });
        };

        if (!members || !Array.isArray(members)) {
            return res.status(400).json({ message: 'Members array is required' });
        }

        const memberObjectIds = members.map((id: string) => new Types.ObjectId(id));

        const uniqueStringIds = Array.from(
            new Set([
                ...memberObjectIds.map((id: Types.ObjectId) => id.toString()), 
                currentUserId.toString()
            ])
        );

        const allMembers: Types.ObjectId[] = uniqueStringIds.map(
            (id: string) => new Types.ObjectId(id)
        );

        const newGroup = await Chat.create({
            isGroup: true,
            name: name.trim(),
            admin: currentUserId as any,
            members: allMembers as any,
        });

        const populatedGroup = await Chat.findById(newGroup._id)
            .populate('members', 'name avatar lastSeen')
            .populate('admin', 'name avatar');
            
        return res.status(201).json(populatedGroup);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create group chat'});
    }
}