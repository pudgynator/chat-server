import User from '../models/User.js';
import { type Request, type Response } from "express";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { phone, name, password } = req.body;
        const existUser = await User.findOne({phone});

        if (existUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({
            phone,
            name,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({
            id: user._id,
            name: user.name,
            phone: user.phone,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}