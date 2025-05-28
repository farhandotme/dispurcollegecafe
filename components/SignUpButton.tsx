import { Button } from "./ui/button"
import Link from "next/link"
type SignUpButtonProps = {
    className? : string
}
const SignupButton = ({className} : SignUpButtonProps) => {
    return (
        <div>
            <Link href={"/signup"}>
                <Button className={`${className} font-cookie-regular
                 bg-cafe-tan px-6  
                 md:px-10 md:py-3 text-center
                 text-cafe-cream
                  hover:bg-cafe-tan text-xl md:text-3xl`}>
                    Signup
                </Button>

            </Link>
        </div>
    )
}
export default SignupButton