"use client"
import { resetPassword } from '@/auth/auth-client';
import ResetPasswordSchema, { ResetPasswordProps } from '@/validators/ResetPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { Button } from './ui/button';
const ResetPasswordPage = () => {
    const router : AppRouterInstance = useRouter();
    const pathname : ReadonlyURLSearchParams  = useSearchParams();
    const token = pathname.get("token") as string
    const { handleSubmit, register, formState: { errors, isSubmitting } } =
        useForm<ResetPasswordProps>({ resolver: zodResolver(ResetPasswordSchema) });
    const handleResetPassword = async (data : ResetPasswordProps) =>{
        if(!token) toast.error("Token missing from URL");
      const response =  await resetPassword({
            newPassword : data.password,
            token : token
        })
    if(response.error?.message){
        toast.error(response.error.message);
    }
    else {
        toast.success("Password reset successfull");
        setTimeout(()=>router.push("/login"), 1000)
    }
    }
    return (
        <main>
            <form onSubmit={handleSubmit(handleResetPassword)}>
                <label htmlFor="newpassword">Set new Password</label>
                <input 
                className='focus:bg-transparent' 
                type="text" {...register("password")} id="newpassword"/>
                {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input 
                className='focus:bg-transparent'
                type="text" {...register("confirmPassword")} id="confirmpassword"/>
                {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Wait till we process" : "Submit"}</Button>
            </form>
        </main>
    )
}
export default ResetPasswordPage
