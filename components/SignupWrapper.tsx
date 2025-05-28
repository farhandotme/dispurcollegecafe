"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Button } from "./ui/button";
import SignpUserSchema, { SignpUserProp } from "@/validators/SignupUser";
import signup from "@/actions/signupuser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const SignupWrapper = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { isSubmitting, errors } } =
        useForm<SignpUserProp>({ resolver: zodResolver(SignpUserSchema) });
    const handleSignup = async (data: SignpUserProp) => {
        console.log(data);
        const response = await signup(data);
        if (response?.success_message) {
            toast.success(response.success_message as string, {autoClose : 1000});
            setTimeout(()=>router.push("/"), 1500)
        }
        else if (response?.errorMessage) {
            toast.error(response.errorMessage as string);
        }
    }
    return (
        <main className="min-h-dvh  overflow-hidden flex items-center justify-center bg-cafe-cream font-cookie-regular">
            <div className="border border-white/20 md:w-96 w-[20rem] rounded-md bg-cafe-tan">
                <h1 className="text-4xl  text-cafe-dark  font-semibold text-center mt-2">Signup to continue</h1>
                <form onSubmit={handleSubmit(handleSignup)} className="p-5 flex flex-col rounded-md h-fit gap-y-3">
                    <label htmlFor="username" className="text-3xl">Username</label>
                    <input {...register("username")}
                        type="text" id="username" className="border
                         placeholder:text-black font-geist
                          border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"
                        placeholder="Username goes here" />
                    {errors.username && <span className="text-red-600 font-geist text-sm">Username must contain min 4 and max 12 characters</span>}
                    <label htmlFor="email" className="text-3xl">Email</label>
                    <input {...register("email")}
                        type="text" id="email" className="border 
                         placeholder:text-black font-geist
                          border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"
                        placeholder="abc@example.com" />
                    {errors.email && <span className="text-red-600 font-geist text-sm">Enter a valid email</span>}
                    <label htmlFor="password" className="text-3xl">Password</label>
                    <input className="border
                         placeholder:text-black font-geist
                          border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"
                        type="password" {...register("password", { minLength: 8, maxLength: 20 })} id="password" />
                    {errors.password && <span className="text-red-600 font-geist text-sm">Password must contain min 8 and max 20 characters</span>}
                    <Button className="bg-cafe-light hover:bg-cafe-light text-2xl text-black">{isSubmitting ? "Signing you in" : "Signup"}</Button>
                </form>
            </div>
        </main>
    )
}
export default SignupWrapper