import type { Request, Response } from 'express';
import User from '../models/User.js';

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.userId;
        const {name , phone} = req.body;

        const updatedData: {name?: string; phone?: string} = {};
        if (name !== undefined) {
            updatedData.name = name;
        };

        if (phone !== undefined) {
            const existingUser = await User.findOne({ phone, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({message: 'Phone number already in use'})
            };
        };

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { returnDocument: 'after', runValidators: true }
       ).select('-password');

       if (!updatedUser) {
        return res.status(404).json({message: 'User not found'})
       };

       return res.json(updatedUser);
    } catch (error) {
        console.error('Update profile error:', error);
        return res.status(500).json({ message: 'Server error during profile update' });
    }
};