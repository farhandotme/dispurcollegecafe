import LoginWrapper from "@/components/LoginWrapper";
import withMetaData from "@/components/withMetaData";
const {metadata , default : Login } = withMetaData({
    title : "Cafe - Login",
    description : "Login page"
}, LoginWrapper)

export {metadata}
export default Login