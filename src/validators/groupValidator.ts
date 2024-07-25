import vine from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

const groupSchema = vine.object({
  group_name: vine.string().trim().minLength(2),
  members: vine.array(vine.string()).minLength(2),
});

export type GroupDataType = Infer<typeof groupSchema>;

export default groupSchema;
