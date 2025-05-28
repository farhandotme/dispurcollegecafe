import {FaGoogle} from "react-icons/fa"
const GoogleLogin  = () =>{
    return (
        <div className="flex items-center justify-center">
            <div className="flex gap-x-1 items-center bg-cafe-bronze px-6 rounded-md py-2 cursor-pointer -rotate-2">
                 <FaGoogle size={23} className="text-cafe-light"/>
            <span className="font-geist font-semibold ">Google</span>
            </div>
           
        </div>
    )
}
export default GoogleLogin