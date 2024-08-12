import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

const resetPasswordSchema = vine.object({
  new_password: vine.string().minLength(8).maxLength(32).trim(),
});

export type ResetPasswordSchemaDataType = Infer<typeof resetPasswordSchema>;

export default resetPasswordSchema;
