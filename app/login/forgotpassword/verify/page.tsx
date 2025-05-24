import ResetPasswordPage from "@/components/ResetPasswordPage";
import withMetaData from "@/components/withMetaData";
import { Suspense } from "react";
const {metadata , default : ResetPassword} = withMetaData({
    title : "Reset Password - Cafe",
    description : "Reset page"
}, ResetPasswordPage)

const ResetPasswordPagewithSuspenseFallback = () => {
return (
    <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword/>
    </Suspense>
)
}
export {metadata}
export default ResetPasswordPagewithSuspenseFallback