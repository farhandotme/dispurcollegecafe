import { Button } from "./ui/button"
import Link from "next/link"
const SignupButton = () => {
    return (
        <div>
            <Link href={"/signup"}>
                <Button className="bg-cafe-tan px-6 text-center hover:bg-cafe-tan">
                    Signup
                </Button>

            </Link>
        </div>
    )
}
export default SignupButton