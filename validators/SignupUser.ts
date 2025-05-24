import { z } from "zod";
const SignpUserSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(20)
})
export default SignpUserSchema
export type SignpUserProp = z.infer<typeof SignpUserSchema>