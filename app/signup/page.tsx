import SignupWrapper from "@/components/SignupWrapper";
import withMetaData from "@/components/withMetaData";
const {metadata, default : Signup} = withMetaData({
    title  : "Cafe - Signup",
    description : "Signup page"
}, SignupWrapper)

export {metadata}
export default Signup