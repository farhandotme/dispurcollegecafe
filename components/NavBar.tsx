"use client";
import Link from "next/link";
import CoffeeSVG from "./CoffeeCupSvg";
import { useSession } from "@/auth/auth-client";
import LoginButton from "./LoginButton";
import SignupButton from "./SignUpButton";
import ProfilePage from "./Profile";

const NavBar = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  return (
    <nav className="bg-cafe-bronze rounded-md py-4 sticky top-0 z-[999]">
      <div className="flex items-center justify-between py-3 px-1">
        <Link href={"/"}>
          <h1 className="text-sm whitespace-nowrap md:text-3xl flex items-center relative font-brew">
            <div>Beanzy Cafe</div>
            <CoffeeSVG className="md:h-16 md:w-16 h-12 w-12 absolute -right-9 md:-right-12" />
          </h1>
        </Link>

        <ul className="text-sm flex gap-x-2 text-cafe-light font-geist">
          {!isPending && (
            user ? <ProfilePage /> : (
              <>
                <LoginButton />
                <SignupButton />
              </>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
