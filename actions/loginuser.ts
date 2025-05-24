"use server"
import { db } from "@/lib/db";
import LoginUserSchema from "@/validators/LoginUser";
import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
const loginUser = async (data: unknown) => {
    const parsed = LoginUserSchema.safeParse(data);
    if (!parsed.success) {
        return {
            error: parsed.error.flatten().fieldErrors,
            status: 400
        }
    }
    const { email, password } = parsed.data;

    try {
       const loginuser =   await auth.api.signInEmail({
            body: {
                email,
                password
            },
            headers: await headers(),
        })
        if(!loginuser){
         return {
            error : "Unknown error"
         }
        }
         else{
            return {
            successMessage : "Successfully logged in"
            }
         }
     
    }
    catch (error) {
        if (error instanceof APIError) {
            switch (error.status) {
                case "UNAUTHORIZED":
                    return {
                        errorMessage: "User not found, Please signup"
                    }
                case "BAD_REQUEST":
                    return { errorMessage: "Invalid Login Credentials." }
                default:
                    return { errorMessage: "Something went wrong." };
            }
        }
    }
}

export default loginUser