import mongoose, { Schema, model } from "mongoose";
const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    last_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
    },
    provider: {
        type: String,
        default: "credentials",
        enum: ["credentials", "google"],
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        select: false,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    friend_requests: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
const User = mongoose.models.User || model("User", UserSchema);
export default User;
