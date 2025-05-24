import ForgotPasswordPage from "@/components/ForgotPage";
import withMetaData from "@/components/withMetaData";
const {metadata , default : ForgotPassword} = withMetaData({
    title : "Forgot Password - Cafe",
    description : "Forgot password page"
}, ForgotPasswordPage)
export {metadata}
export default ForgotPassword