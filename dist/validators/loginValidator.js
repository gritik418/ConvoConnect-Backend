import vine from "@vinejs/vine";
const loginSchema = vine.object({
    email: vine.string().trim(),
    password: vine.string().minLength(8).maxLength(32).trim(),
});
export default loginSchema;
