import Link from "next/link"
import CoffeeSVG from "./CoffeeCupSvg"

const NavBar = () => {
    return (
        <nav className="bg-cafe-orange rounded-md py-4 sticky top-0">
            <div className="flex items-center justify-between px-3 ">
                <Link href={"/"} className="flex items-center">
                    <h1 className="text-lg md:text-3xl">
                        Brew Cafe
                    </h1>
                    <CoffeeSVG className="h-16 w-16" />
                </Link>
                <ul className="text-lg text-white flex gap-x-2 font-neue-regular">
                    <Link href={"/about"}>   
                    <li>About us</li>
                    </Link>
                    <li>
                        <Link href={"/products"}>
                         Products
                        </Link>
                    </li>
                    <li>
                        <Link href={"/settings"}>
                        Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar