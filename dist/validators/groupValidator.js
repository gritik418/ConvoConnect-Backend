import vine from "@vinejs/vine";
const groupSchema = vine.object({
    group_name: vine.string().trim().minLength(2),
    members: vine.array(vine.string()).minLength(2),
});
export default groupSchema;
