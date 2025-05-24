import Link from "next/link"
import ThemeSwitcher from "./ThemeSwitcher"

const Home = () =>{
    return (
        <>
            <ThemeSwitcher/>
        <div>Hello from Cafe</div>
        <Link href={"/login"}>Login</Link>
        <br />
        <Link href={"/signup"}>Signup</Link>
        </>
    )
}
export default Home