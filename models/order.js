import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        orderName: String,
        address: String,
        price: String,
        orderImg: String,
        orderFor: String,
        phone: String,
        orderedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: String
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;