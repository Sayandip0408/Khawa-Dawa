import { NextResponse } from "next/server"
import connectMongoDB from "@/utils/db";
import User from "@/models/user";

export const GET = async ({ params }) => {
    // await connectMongoDB();
    // const { id } = params;
    // const user = await User.findOne({phone: id});
    // if(user){
    //     return NextResponse.json({ user });
    // }
    // return NextResponse.json({ message:"Error Occurred" }, {status:201});
}