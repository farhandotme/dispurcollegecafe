import { z } from "zod";

const updatePasswordSchema = z.object({
    updatepassword : z.string().min(8).max(20), 
})
export default updatePasswordSchema;
export type updatePasswordSchemaProp = z.infer<typeof updatePasswordSchema>