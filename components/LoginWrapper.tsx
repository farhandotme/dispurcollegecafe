"use client"
import LoginUserSchema, { LoginUserProps } from "@/validators/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Button } from "./ui/button";
import loginUser from "@/actions/loginuser";
import { toast, } from "react-toastify"
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import CoffeeScene from "./CoffeeBeans";
const LoginWrapper = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } =
        useForm<LoginUserProps>({ resolver: zodResolver(LoginUserSchema) });
    const router: AppRouterInstance = useRouter();
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
            router.push("/")
        }
    }
    return (
        <main className=" h-screen overflow-hidden flex items-center justify-center font-cookie-regular bg-cafe-cream">
            <div className="border border-white/20 md:w-96 w-[20rem] rounded-md bg-cafe-tan">
                <h1 className="font-semibold text-center mt-2 text-cafe-dark text-5xl">Login to continue</h1>
                <form onSubmit={handleSubmit(handleLogin)} className="p-5 flex flex-col rounded-md h-fit gap-y-3">
                    <label htmlFor="email" className="text-3xl">Email</label>
                    <input {...register("email")}
                        type="text" id="email" className="border text-lg
                         placeholder:text-black font-geist placeholder:font-cookie-regular placeholder:text-xl
                          border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"
                        placeholder="abc@example.com" />
                    {errors.email && <span className="text-red-600">Enter a valid email</span>}
                    <label htmlFor="password" className="text-3xl" >Password</label>
                    <input className="border text-lg
                         placeholder:text-black font-geist placeholder:font-cookie-regular placeholder:text-xl
                          border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"
                        type="password" {...register("password", { minLength: 8, maxLength: 20 })} id="password" />
                    <div className="flex justify-center text-sm">
                        <Link href={"/login/forgotpassword"}>
                            <span className="hover:underline cursor-pointer text-xl">Forgot password?</span>
                        </Link>
                    </div>
                    {errors.password && <span className="text-red-600">Password must contain min 8 and max 20 characters</span>}
                    <Button className="bg-cafe-light hover:bg-cafe-light text-black text-2xl">{isSubmitting ? "Logging you in" : "Login"}</Button>
                </form>
            </div>
        </main>
    )
}
export default LoginWrapper