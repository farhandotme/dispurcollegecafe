"use client"
import LoginUserSchema, { LoginUserProps } from "@/validators/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Button } from "./ui/button";
const LoginWrapper = () =>{
const {register, handleSubmit, formState : {isSubmitting, isValid, errors}} = 
useForm<LoginUserProps>({resolver : zodResolver(LoginUserSchema)});
const handleLogin =  async (data : LoginUserProps) =>{
console.log(data);
}
return (
    <main className="h-screen flex items-center justify-center">
        <div className="shadow-[0px_0px_30px_1.2px_white] w-96 rounded-md">
            <h1 className="text-2xl font-semibold text-center mt-2">Login to continue</h1>
            <form onSubmit={handleSubmit(handleLogin)} className="p-5 flex flex-col rounded-md h-fit gap-y-3">
             <label htmlFor="email">Email</label>
            <input {...register("email")}
             type="text" id="email" className="border border-white/10 outline-none rounded-md p-1 px-3 bg-transparent" 
            placeholder="abc@example.com"/>
            <label htmlFor="password">Password</label>
            <input className="border border-white/10 outline-none rounded-md p-1 px-3 bg-transparent"  
            type="password" {...register("password", {minLength : 8 , maxLength : 20})} id="password"/>
            <Button>Login</Button>
            </form>
        </div>
    </main>
)
}
export default LoginWrapper