import { z } from "zod";
const LoginUserSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(20)
})
export type LoginUserProps = z.infer<typeof LoginUserSchema>
export default LoginUserSchema
