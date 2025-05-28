"use server"
import { auth } from "@/auth/auth"
import updatePasswordSchema from "@/validators/updatePassword";
const updatePassword = async (userId: string, password: unknown) => {
    const parseddata = updatePasswordSchema.safeParse(password);
    if (!parseddata.success) {
        return {
            error: parseddata.error.flatten().fieldErrors
        }
    }

    const { updatepassword } = parseddata.data
    const ctx = await auth.$context;
    const hashedPassword = await ctx.password.hash(updatepassword);
    const updatedPassword = await ctx.internalAdapter.updatePassword(userId, hashedPassword);
    console.log("Updating password for user ID:", userId);
    console.log("Ppdated password is :", updatepassword)
    return updatedPassword;
}
export default updatePassword;

