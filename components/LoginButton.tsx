import { Button } from "./ui/button"
import Link from "next/link"
const LoginButton = () => {
    return (
        <div>
            <Link href={"/login"}>
              <Button className="bg-cafe-tan px-6 hover:bg-cafe-tan">
                Login</Button>
            
            </Link>
        </div>
    )
}

export default LoginButton