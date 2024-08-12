import vine from "@vinejs/vine";
const resetPasswordSchema = vine.object({
    new_password: vine.string().minLength(8).maxLength(32).trim(),
});
export default resetPasswordSchema;
