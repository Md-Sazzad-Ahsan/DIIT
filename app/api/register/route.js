import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();

        await connect(); // Connect to the database

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });

        // Save the new user to the database
        await newUser.save();
        
        return new NextResponse("User registered successfully", { status: 200 });
    } catch (err) {
        console.error("Error creating user:", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};
