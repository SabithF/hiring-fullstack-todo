import mongoose from "mongoose"

export default async function connectDB() {
    try {
        if (!process.env.DB_URI) {
            console.error("DB URI is not set")
            process.exit(1);
        }
        await mongoose.connect(process.env.DB_URI);
        console.log("DB connected successfully")
    } catch (error) {
        console.error("DB failed to connect- error", error);
        process.exit(1);
    }
}