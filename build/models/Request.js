import mongoose, { Schema, model } from "mongoose";
const RequestSchema = new Schema({
    status: {
        type: String,
        default: "pending",
        enum: ["accepted", "pending", "rejected"],
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Request = mongoose.models.Request || model("Request", RequestSchema);
export default Request;
