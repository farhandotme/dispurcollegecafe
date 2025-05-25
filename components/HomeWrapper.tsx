import Link from "next/link"
import ThemeSwitcher from "./ThemeSwitcher"

const Home = () =>{
    return (
        <>
            <ThemeSwitcher/>
        <div className="text-3xl font-bold">Hello from Cafe</div>
        <Link href={"/login"} className="text-2xl">Login</Link>
        <br />
        <Link href={"/signup"}>Signup</Link>
        <br />
        <Link href={"/login/forgotpassword"}>Forgot Password</Link>
        </>
    )
}
export default Home