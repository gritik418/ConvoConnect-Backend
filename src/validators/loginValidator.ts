import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

const loginSchema = vine.object({
  email: vine.string(),
  password: vine.string().minLength(8).maxLength(32),
});

export type LoginDataType = Infer<typeof loginSchema>;

export default loginSchema;
