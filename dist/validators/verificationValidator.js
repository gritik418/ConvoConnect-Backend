import vine from "@vinejs/vine";
const verificationSchema = vine.object({
    id: vine.string(),
    secret_token: vine.string(),
});
export default verificationSchema;
