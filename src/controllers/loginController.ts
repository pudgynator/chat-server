import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { phone, password } = req.body;
        if( !phone || !password) {
            return res.status(400).json({ message: 'Phone and password are required' });
        }

        const user = await User.findOne({ phone });
        if(!user) {
            return res.status(401).json({ message: 'Invalid phone or password' });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid phone or password' });
        }

        return res.status(200).json({
            id: user._id,
            name: user.name,
            phone: user.phone,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};