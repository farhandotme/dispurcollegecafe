import Link from "next/link"
import CoffeeSVG from "./CoffeeCupSvg"
const NavBar = () => {
    return (
        <nav className="bg-cafe-bronze rounded-md py-4 sticky top-0 z-[999]">
            <div className="flex items-center justify-between py-3 px-1">
                <Link href={"/"}>
                    <h1 className="text-lg whitespace-nowrap md:text-3xl flex items-center relative">
                        <div>
                        Beanzy Cafe   
                        </div>
                    <CoffeeSVG className="h-16 w-16 absolute -right-12"/>
                    </h1>
                </Link>
                <ul className="text-sm flex gap-x-2 
                font-neue-regular
                text-cafe-light
                ">
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