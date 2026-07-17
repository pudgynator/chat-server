import type {  Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/auth.js";
import User from "../models/User.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET! as string
        ) as JwtPayload;

        req.user = decoded;
        await User.findByIdAndUpdate(decoded.userId, {
            lastSeen: new Date(),
        })

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}