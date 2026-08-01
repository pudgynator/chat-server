import mongoose from "mongoose";

export async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            console.error("CRITICAL: MONGO_URI environment variable is not defined!");
            process.exit(1);
        }
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error: any) {
        console.error("=== MONGO CONNECTION ERROR ===");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        console.error("Full Error Object:", JSON.stringify(error, null, 2));
        console.error("===============================");
        process.exit(1);
    }
}