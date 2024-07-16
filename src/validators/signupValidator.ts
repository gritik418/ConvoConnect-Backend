import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

const signupSchema = vine.object({
  first_name: vine.string().minLength(3),
  last_name: vine.any(),
  email: vine.string().email(),
  username: vine.string(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});

export type SignUpDataType = Infer<typeof signupSchema>;

export default signupSchema;
