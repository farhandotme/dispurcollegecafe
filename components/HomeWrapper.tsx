"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/auth/auth-client";
import CoffeeScene from "./CoffeeBeans";
import Footer from "./Footer";
import Image from "next/image";
import HeroContent from "./HeroContent";

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

  // Refs for each word div
  const wordRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (session?.user?.name) {
      setUser(session.user.name);
      setUserData(session.user);
    } else {
      setUser(undefined);
      setUserData(undefined);
    }
  }, [session]);

  // GSAP animation for wordRefs
  useGSAP(() => {
    gsap.from(wordRefs.current, {
      opacity: 0,
      y: 20,
      stagger: 0.7,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <>
      <main className="relative bg-cafe-dark min-h-[100dvh] flex flex-col items-center justify-center 
      text-center text-white px-1 md:px-4 overflow-hidden">
        <CoffeeScene beanSize={[1, 1]} scale={0.1} />
        {/* Animated text */}
        <div className="text-5xl font-bold  text-cafe-cream z-10 collider-target flex flex-col gap-2 mt-20">
          {["Welcome", "to", "Beanzy Cafe"].map((item, index) => (
            <div 
              key={index}
              ref={
                (el) =>{if(el) wordRefs.current[index] = el!}
              }
              className="overflow-hidden"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xl text-cafe-cream/70 max-w-md z-10 collider-target">
          Where Aroma Meets Ambience.
        </p>

        <div className="mt-6 flex gap-4 z-10">
          <button className="bg-cafe-cream text-cafe-dark  md:text-lg  text-sm px-4 py-4 md:px-6 md:py-2 rounded-lg 
          shadow hover:scale-105 transition collider-target">
            Explore Menu
          </button>
          <button className="border border-cafe-cream  md:text-lg text-sm px-4 py-4 md:px-6 md:py-2
           text-cafe-cream  rounded-lg active:bg-cafe-cream active:text-cafe-dark hover:bg-cafe-cream hover:text-cafe-dark transition collider-target">
            Reserve a Table
          </button>
        </div>
        <div>
          <p className= "text-3xl md:text-4xl text-center mt-3 font-cookie-regular text-cafe-tan">
            Beanzy Cafe is a creative project by Mafijur Ali and Farhan Hussian, developed for Dispur College — a vibrant digital concept blending aroma, ambience, and innovation
          </p>
        </div> 
        <HeroContent/>
      </main>
      <Footer/>
    </>
  );
}
