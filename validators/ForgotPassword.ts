import z from "zod";
const ForgotpasswordSchema = z.object({
    email : z.string().email()
})

export default ForgotpasswordSchema
export type ForgotpasswordProps = z.infer<typeof ForgotpasswordSchema> 