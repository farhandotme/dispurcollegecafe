"use client"
import LoginUserSchema, { LoginUserProps } from "@/validators/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
const SignupWrapper = () =>{
const {register, handleSubmit, formState : {isSubmitting, isValid}} = 
useForm<LoginUserProps>({resolver : zodResolver(LoginUserSchema)});
const handleSignup =  async () =>{

}
return (
    <main className="shadow-[0px_0px_1px_1.2px]">
        <div>
            <form action=""></form>
        </div>
    </main>
)
}
export default SignupWrapper