import { z } from "zod";
const SignpUserSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(20),
    username : z.string().min(4).max(12)
})
export default SignpUserSchema
export type SignpUserProp = z.infer<typeof SignpUserSchema>