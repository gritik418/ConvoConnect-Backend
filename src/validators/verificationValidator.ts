import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

const verificationSchema = vine.object({
  id: vine.string(),
  secret_token: vine.string(),
});

export type VerificationDataType = Infer<typeof verificationSchema>;

export default verificationSchema;
