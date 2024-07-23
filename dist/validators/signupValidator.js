import vine from "@vinejs/vine";
const signupSchema = vine.object({
    first_name: vine.string().minLength(3).trim(),
    last_name: vine.any(),
    email: vine.string().email(),
    username: vine.string().trim(),
    password: vine.string().minLength(8).maxLength(32).confirmed().trim(),
});
export default signupSchema;
