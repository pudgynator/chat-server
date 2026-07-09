import { connectDB } from '../config/db.js';

export const createUser = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}