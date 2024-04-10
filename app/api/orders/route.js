import Order from "@/models/order";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server"

export const GET = async () => {
    await connectMongoDB();
    const orders = await Order.find();
    return NextResponse.json({ orders });
}

export const POST = async (request) => {
    try {
        await connectMongoDB();
        const { orderName, address, price, orderImg, orderFor, phone, orderedBy, status } = await request.json();
        await Order.create({ orderName, address, price, orderImg, orderFor, phone, orderedBy, status });
        return NextResponse.json({ message: "Order Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Order Not Created" }, { status: 401 });
    }
}