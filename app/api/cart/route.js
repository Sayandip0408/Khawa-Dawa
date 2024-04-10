import Cart from "@/models/cart";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server"

export const GET = async () => {
    await connectMongoDB();
    const cartItems = await Cart.find();
    return NextResponse.json({ cartItems }, { status: 200 });
}

export const POST = async (req) => {
    try {
        await connectMongoDB();
        const { itemName, price, itemImg, quantity, orderedBy } = await req.json();
        await Cart.create({ itemName, itemImg, price, quantity, orderedBy });
        return NextResponse.json({ 'msg': 'added to cart' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ 'error': 'some error occurred' }, { status: 401 });
    }
}

export const DELETE = async (request) => {
    try {
        await connectMongoDB();
        const { userId } = await request.json();
        const filter = { orderedBy: userId };
        if (filter) {
            const result = await Cart.deleteMany(filter);
            return NextResponse.json({ 'Success': 'Cart cleared' }, { status: 200 });
        } else {
            return NextResponse.json({ 'Error': 'Items Not Deleted' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ 'error': 'Error' }, { status: 401 });
    }
}