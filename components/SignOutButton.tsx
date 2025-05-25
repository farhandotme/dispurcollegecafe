"use client"
import { signOut } from "@/auth/auth-client"
import { Button } from "./ui/button"
import { toast } from "react-toastify"
const handleSignout = async () => {
    await signOut(
        {
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Sign out uccessfull", { autoClose: 1000 })
                }
            }
        }
    )
}
const SignoutButton = () => {
    return (
        <Button onClick={handleSignout}>Sign Out</Button>
    )
}
export default SignoutButton