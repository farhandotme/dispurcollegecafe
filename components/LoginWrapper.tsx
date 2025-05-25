"use client"
import LoginUserSchema, { LoginUserProps } from "@/validators/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Button } from "./ui/button";
import loginUser from "@/actions/loginuser";
import { toast, } from "react-toastify"
import Link from "next/link";
const LoginWrapper = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } =
        useForm<LoginUserProps>({ resolver: zodResolver(LoginUserSchema) });
    const handleLogin = async (data: LoginUserProps) => {
        const response = await loginUser(data);
        if (response?.error) {
            toast("Parsing of data failed");
        }
        else if (response?.errorMessage) {
            toast.error(response.errorMessage)
        }
        else if (response?.successMessage) {
            toast.success((response.successMessage))
        }
    }
    return (
        <main className="h-screen overflow-hidden flex items-center justify-center">
            <div className="border border-white/20 md:w-96 w-[20rem] rounded-md">
                <h1 className="text-2xl font-semibold text-center mt-2">Login to continue</h1>
                <form onSubmit={handleSubmit(handleLogin)} className="p-5 flex flex-col rounded-md h-fit gap-y-3">
                    <label htmlFor="email">Email</label>
                    <input {...register("email")}
                        type="text" id="email" className="border border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"
                        placeholder="abc@example.com" />
                    {errors.email && <span className="text-red-600">Enter a valid email</span>}
                    <label htmlFor="password">Password</label>
                    <input className="border border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"
                        type="password" {...register("password", { minLength: 8, maxLength: 20 })} id="password" />
                    <div className="flex justify-center text-sm">
                        <Link href={"/login/forgotpassword"}>
                            <span className="hover:underline cursor-pointer">Forgot password?</span>
                        </Link>
                    </div>
                    {errors.password && <span className="text-red-600">Password must contain min 8 and max 20 characters</span>}
                    <Button>{isSubmitting ? "Logging you in" : "Login"}</Button>
                </form>
            </div>
        </main>
    )
}
export default LoginWrapper