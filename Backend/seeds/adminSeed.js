import "dotenv/config"
import bcrypt from "bcrypt";
import { connectDb } from "../config/db.js";
import User from "../models/UserSchema.js";

const createAdmin = async () => {
    try {
        await connectDb();

        const existingAdmin = await User.findOne({
            role: "admin"
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await User.create({
            name: "Admin",
            email: "admin@example.com",
            password: hashedPassword,
            age: 30,
            role: "admin"
        });

        console.log(`Admin created: ${admin.email}`);

        process.exit(0);

    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();