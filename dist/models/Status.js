import mongoose, { Schema, model } from "mongoose";
const StatusSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    images: [
        {
            type: String,
        },
    ],
    content: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "24h",
    },
});
const Status = mongoose.models.Status || model("Status", StatusSchema);
export default Status;
