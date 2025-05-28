"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "@/auth/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = session?.user;
  const username = user?.name ?? "";
  const fallbackInitials = username.trim().slice(0, 2).toUpperCase();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <div className="flex items-center gap-x-2">
        <div className="bg-cafe-dark md:px-6 py-2 px-3
         rounded-md font-cookie-regular text-xl
         md:text-2xl">
          <span>Welcome</span>
          <span className="ml-1">{username}</span>
        </div>
        <div className="relative " ref={menuRef}>
          <div onClick={toggleMenu} className="cursor-pointer">
            <Avatar className="md:w-10 md:h-10 w-8 h-8">
              <AvatarImage src={user?.image ?? ""} />
              <AvatarFallback className="text-xl text-cafe-dark md:h-10 md:w-10 w-8 h-8">
                {fallbackInitials || "??"}
              </AvatarFallback>
            </Avatar>
          </div>
          {menuOpen && (
            <div className="absolute z-50 mt-2 w-48 rounded-md bg-cafe-sand shadow-lg right-0 border border-cafe-dark">
              <ul className="text-cafe-dark p-2 space-y-2 text-2xl flex flex-col justify-center items-center font-cookie-regular">

                <Link href="/dashboard" className="w-full flex justify-center">
                  <li className="cursor-pointer hover:bg-cafe-cream transition-all duration-150 ease-in-out w-full flex justify-center p-2 rounded">
                    Dashboard
                  </li>
                </Link>
                <Link href="/products" className="w-full flex justify-center">
                  <li className="cursor-pointer hover:bg-cafe-cream transition-all duration-150 ease-in-out w-full flex justify-center p-2 rounded">
                    Products
                  </li>
                </Link>
                <Link href="/profile" className="w-full flex justify-center">
                  <li className="cursor-pointer hover:bg-cafe-cream transition-all duration-150 ease-in-out w-full flex justify-center p-2 rounded">
                    Profile
                  </li>
                </Link>
                <Link href="/settings" className="w-full flex justify-center">
                  <li className="cursor-pointer hover:bg-cafe-cream transition-all duration-150 ease-in-out w-full flex justify-center p-2 rounded">
                    Settings
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>


    </>

  );
};

export default ProfilePage;
