"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const HeroContent = () => {
  const divWrapperRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: divWrapperRef.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1, // smooth scrub
      },
    });

    tl.from(divWrapperRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger : {
          trigger : divWrapperRef.current,
          scrub : true,
        },
    })
      .from(imageWrapperRef.current, {
        opacity: 0,
        x: 50,
        y: 20,
        duration : 0.5,
        scrollTrigger : {
          trigger : imageWrapperRef.current,
          scrub : true,
        },
        ease: "power3.out",
      })
      .from(textRef.current, {
        opacity: 0,
        x: -30,
        duration:  0.5,
        ease: "power3.out",
      })
      .from(buttonRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        scrollTrigger : {
          trigger : buttonRef.current,
          scrub : true,
     
        },
        ease: "back.out(1.7)",
      });
  }, []);

  return (
    <div
      ref={divWrapperRef}
      className="w-full mt-3 grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-4 md:px-12 py-8 bg-[#fffaf0] rounded-xl shadow-md"
    >
      <div ref={imageWrapperRef} className="overflow-hidden rounded-lg">
        <Image
          className="w-full h-64 md:h-[400px] object-cover"
          src="/Images/but-first-coffee-sign-coffee-shop-aesthetic-jpg-z66v95kks3r1vtm3.jpg"
          height={400}
          width={600}
          alt="coffee-sign"
          quality={100}
        />
      </div>

      <div className="flex flex-col gap-y-6 text-center md:text-left">
        <h1
          ref={textRef}
          className="text-cafe-bronze ml-3 hover-scale font-cookie-regular text-3xl md:text-6xl text-brown-800 leading-tight hover:scale-105 transition-transform duration-300"
        >
          Brewed with love — You’ve got to try it!
        </h1>

        <p className="text-md md:text-lg text-gray-700">
          Every cup at Beanzy is handcrafted to warm your soul. Whether you're
          craving a strong espresso or a silky latte, we've got something special
          brewing for you.
        </p>

        <div ref={buttonRef}>
          <button className="px-6 py-3 
          text-cafe-dark bg-brown-700 hover:bg-brown-800 
          transition rounded-full text-sm md:text-base 
          font-semibold">
            Explore Our Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
