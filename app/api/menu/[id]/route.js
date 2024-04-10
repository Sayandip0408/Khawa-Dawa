import Menu from "@/models/menu";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server"

export const GET = async (_, response) => {
    try {
        await connectMongoDB();
        const id = response.params.id;
        const item = await Menu.findById(id);
        if (!item) {
            return NextResponse.json({ 'error': 'not-found' }, { status: 404 });
        }
        return NextResponse.json({ 'message': item }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ 'error': 'server error' }, { status: 401 });
    }
}

