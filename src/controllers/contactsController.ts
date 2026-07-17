import type { Request, Response } from 'express';
import User from '../models/User.js';
import Contact from '../models/Contact.js';

export const getContacts = async (req: Request, res: Response) => {
    try {
        const currentUserId = req.user?.userId;
        if (!currentUserId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const contacts = await Contact.find({
            owner: currentUserId,
        }).populate('contact', 'name phone lastSeen');

     const result = contacts.map((item: any) => ({
            id: item.contact._id,
            name: item.name,
            phone: item.contact.phone,
            lastSeen: item.contact.lastSeen,
        }));

        return res.status(200).json(result)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error'});
    }
};

export const createContact = async (req: Request, res: Response) => {
    try {
        const currentUserId = req.user?.userId;
        const { name, phone } = req.body;  

        if (!currentUserId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!name || !phone) {
            return res.status(400).json({message: 'Name and phone are required'});
        }
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found'})
        }

        if (user._id.toString() === currentUserId) {
            return res.status(400).json({message: 'You can not add yourself'})
        }

        const existContact = await Contact.findOne({
            owner: currentUserId,
            contact: user._id,
        });

        if (existContact) {
            return res.status(409).json({ message: 'Contact already exists'});
        }

        const contact = new Contact({
            owner: currentUserId,
            contact: user._id,
            name,
        })

        await contact.save();

        return res.status(201).json(contact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error'});
    }
}