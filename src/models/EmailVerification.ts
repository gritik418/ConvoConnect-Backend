import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const EmailVerificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  secret_token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  },
});

EmailVerificationSchema.pre("save", async function (next) {
  if (this.isModified("secret_token")) {
    const salt = await bcrypt.genSalt(8);
    this.secret_token = await bcrypt.hash(this.secret_token, salt);
  }
  next();
});

const EmailVerification =
  mongoose.models.EmailVerification ||
  model("EmailVerification", EmailVerificationSchema);

export default EmailVerification;
