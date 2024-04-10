import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
    {
        itemName: String,
        price: String,
        itemImg: String,
        quantity: String,
        orderedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;