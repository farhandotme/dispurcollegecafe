import z from "zod";
const ResetPasswordSchema = z.object({
    password : z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
    confirmPassword : z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
}).refine((data)=>
data.password === data.confirmPassword , {path : ["confirmPassword"], message : "Password didn't match"}
)

export default ResetPasswordSchema
export type ResetPasswordProps = z.infer<typeof ResetPasswordSchema> 