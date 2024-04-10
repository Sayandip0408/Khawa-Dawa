import Order from "@/models/order";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server"

export const GET = async (_, response) => {
    try {
        await connectMongoDB();
        const userId = response.params.id;
        const orderItems = await Order.find({ orderedBy: userId });
        return NextResponse.json({ orderItems }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ 'error': 'Error' }, { status: 400 });
    }
}