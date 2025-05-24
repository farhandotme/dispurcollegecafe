import { forgetPassword } from "@/auth/auth-client";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
const ConfirmEmailPage = ({ email }: { email: string }) => {
  const handleResetPage = async () => {
    const forgetPasswordapi = await forgetPassword({
      email,
      redirectTo: `${window.location.origin}/login/forgotpassword/verify`
    })
    if (forgetPasswordapi.error?.message) {
      toast.error(forgetPasswordapi.error.message)
    }
    else {
      toast.success("Check your email for reset link")
    }
  }
  return (
    <div>
      <span>{email}</span>
      <Button onClick={handleResetPage}>Send reset link</Button>
    </div>
  )
}

export default ConfirmEmailPage