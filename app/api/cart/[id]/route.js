import Cart from "@/models/cart";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server"

export const GET = async (_, response) => {
    try {
        await connectMongoDB();
        const userId = response.params.id;
        const cartItems = await Cart.find({ orderedBy: userId });
        return NextResponse.json({ cartItems }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ 'error': 'Error' }, { status: 400 });
    }
}

export const DELETE = async (request) => {
    try {
        await connectMongoDB();
        const { userId, cartId } = await request.json();
        const cartItem = await Cart.findById(cartId);
        if (cartItem.orderedBy.toString() === userId) {
            await Cart.findByIdAndDelete(cartId);
            return NextResponse.json({ cartItem }, { status: 200 });
        } else {
            return NextResponse.json({ 'Error': 'Item Not Deleted' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ 'error': 'Error' }, { status: 401 });
    }
}