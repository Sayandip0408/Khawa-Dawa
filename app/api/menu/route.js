import Menu from "@/models/menu";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server"

export const GET = async () => {
    await connectMongoDB();
    const menus = await Menu.find();
    return NextResponse.json({ menus });
}

export const POST = async (request) => {
    await connectMongoDB();
    const { itemName, price, itemImg, description, itemCategory } = await request.json();
    await Menu.create({ itemName, price, itemImg, description, itemCategory });
    return NextResponse.json({ message: "Menu Created" }, { status: 201 });
}

export const DELETE = async (request) => {
    await connectMongoDB();
    const { _id } = await request.json();
    try {
        const deletedItem = await Menu.findByIdAndDelete(_id);
        if (deletedItem) {
            return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export const PUT = async (req) => {
    try {
        await connectMongoDB();
        const { _id, itemName, itemImg, price, itemCategory, description } = await req.json();
        const filter = { _id: _id };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                itemName: itemName,
                itemImg: itemImg,
                price: price,
                itemCategory: itemCategory,
                description: description
            },
        };
        const result = await Menu.updateOne(filter, updateDoc, options);
        return NextResponse.json({ 'message': result }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ 'error': 'server error' }, { status: 401 });
    }
}