import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        password: String,
        phone: String,
        houseNo: String,
        city: String,
        locality: String,
        pin: String,
        district: String,
        state: String,
        admin: Boolean
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;