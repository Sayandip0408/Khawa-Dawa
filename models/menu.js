import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema(
    {
        itemName: String,
        price: String,
        itemImg: String,
        description: String,
        itemCategory: String
    },
    {
        timestamps: true,
    }
);

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;