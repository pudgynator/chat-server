import mongoose from "mongoose";

export async function connectDB() {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error("CRITICAL: MONGO_URI environment variable is not defined!");
        process.exit(1);
    }
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}