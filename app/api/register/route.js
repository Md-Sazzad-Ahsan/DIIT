import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const {name,email,password} =await request.json();

    await connect();
    const existingUser = await User.findOne({email: email});

    if (existingUser) {
        return new NextResponse("User already exists",{status:400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password: hashedPassword})

    try {
        await newUser.save();
        return new NextResponse("User registered successfully", {status:200});

    } catch (err) {
        return new NextResponse(err, {status:500});
     }
}