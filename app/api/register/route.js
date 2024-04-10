import connectMongoDB from "@/utils/db";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server"
import User from "@/models/user";

export const POST = async (request) => {
    await connectMongoDB();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    try {
        const { name, password, phone, houseNo, city, locality, pin, district, state } = await request.json();
        const user = await User.findOne({ phone });
        if (user) {
            return NextResponse.json({ message: "User already Exists" }, { status: 401 });
        }
        const admin = false;
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({ name, password: hashedPassword, phone, houseNo, city, locality, pin, district, state, admin });
        return NextResponse.json({ message: "User Created" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Registration Failed!" }, { status: 400 });
    }
}