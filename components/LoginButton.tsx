import { Button } from "./ui/button"
import Link from "next/link"
const LoginButton = () => {
    return (
        <div>
            <Link href={"/login"}>
              <Button className="font-cookie-regular bg-cafe-tan
               px-6 md:px-10 md:py-3
               text-cafe-cream
                hover:bg-cafe-tan text-xl md:text-3xl">
                Login</Button>
            
            </Link>
        </div>
    )
}

export default LoginButton