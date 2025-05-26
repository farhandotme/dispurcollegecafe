"use client"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/auth/auth-client";
import SignoutButton from "./SignOutButton";
import CoffeeScene from "./CoffeeBeans";
interface ClientUserProps {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
  } | undefined;
}
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<ClientUserProps["user"] | undefined>(session?.user);
  const [user, setUser] = useState<string | undefined>();
  const ref = useRef<(HTMLSpanElement | null)[]>([]); // array elements will come here so
  useEffect(() => {
    if (session?.user?.name) {
      setUser(session.user.name);
      setUserData(session.user);
    } else {
      setUser(undefined);
      setUserData(undefined);
    }
  }, [session])
  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      stagger: 0.8,
      x: 3,
      y: 2,
      duration: 0.5
    })
  })
  useEffect(() => {
    console.log(ref.current);
  }, []);
  return (
    <>
      <main className="relative bg-cafe-dark min-h-screen flex flex-col items-center justify-center text-center text-white px-4">
        <CoffeeScene beanSize={[1,1]} scale={0.1}/>
        <div className="text-5xl font-bold text-cafe-cream z-10 collider-target">Welcome to Beanzy Cafe</div>
        <p className="mt-4 text-xl text-cafe-cream/70 max-w-md z-10 collider-target">
          Where Aroma Meets Ambience.
        </p>
        <div className="mt-6 flex gap-4 z-10">
          <button className="bg-cafe-cream text-cafe-dark px-6 py-2 rounded-lg shadow hover:scale-105 transition collider-target">
            Explore Menu
          </button>
          <button className="border border-cafe-cream text-cafe-cream px-6 py-2 rounded-lg hover:bg-cafe-cream hover:text-cafe-dark transition collider-target">
            Reserve a Table
          </button>
        </div>
      </main>
    </>
  );
}
