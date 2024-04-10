import User from "@/models/user";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';

export const POST = async (request) => {
    try {
        await connectMongoDB();
        const { phone, password } = await request.json();
        const user = await User.findOne({ phone });
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }
        return NextResponse.json({ message: "Login Successful", user: user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}