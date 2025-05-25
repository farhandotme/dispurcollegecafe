"use client"
import ForgotpasswordSchema, { ForgotpasswordProps } from "@/validators/ForgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import searchUser from "@/actions/searchuser";
import { toast } from "react-toastify";
import { useState } from "react";
import Resetpage from "./ConfirmEmail";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>("");
    const [showResetPage, setShowResetPage] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();
    const { handleSubmit, register, formState: { isSubmitting, errors } } =
        useForm<ForgotpasswordProps>({ resolver: zodResolver(ForgotpasswordSchema) });
    const handleForgotPassword = async (data: ForgotpasswordProps) => {
        const response = await searchUser(data);
        if (response.errorMessage) {
            toast.error(response.errorMessage as string);
            router.push("/signup")
        }
        else if (response.success_message) {
            toast.success(response.success_message as string);
            setEmail(data.email as string)
            setShowResetPage(true);
        }
    }
    return (
        <main className="">
            {showResetPage ? <Resetpage email={email}/> : <form onSubmit={handleSubmit(handleForgotPassword)}>
                <label htmlFor="email">Email</label>
                <input {...register("email")}
                    type="text" id="email" className="border border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"
                    placeholder="abc@example.com" />
                {errors.email && <span className="text-red-600">Enter a valid email</span>}
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Searching wait till we find..." : "Search"}</Button>
            </form> 
            }
        </main>
    )
}
export default ForgotPasswordPage