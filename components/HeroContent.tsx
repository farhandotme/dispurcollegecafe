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
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const extraTextRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const coffeeNewspaper = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // All devices
        "(min-width: 0px)": () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: divWrapperRef.current,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.3,
            },
          });

          tl.from(divWrapperRef.current, {
            opacity: 0,
            scale: 0.6,
            duration: 1,
            ease: "power2.out",
          })
            .from(imageWrapperRef.current, {
              opacity: 0,
              x: -80,
              y: 40,
              transformOrigin: "left center",
              duration: 0.6,
              ease: "power3.out",
            })
            .from(textRef.current, {
              opacity: 0,
              y: 50,
              rotateX: 60,
              transformOrigin: "bottom",
              duration: 1,
              ease: "power4.out",
            })
            .from(paragraphRef.current, {
              opacity: 0,
              y: 30,
              duration: 0.8,
              ease: "power2.out",
            })
            .from(extraTextRef.current, {
              opacity: 0,
              x: 30,
              duration: 0.8,
              ease: "power2.out",
            })
            .from(buttonRef.current, {
              opacity: 0,
              scale: 0.9,
              duration: 0.6,
              ease: "back.out(1.7)",
            })
            .from(coffeeNewspaper.current, {
              opacity: 0,
              x: 100,
              rotateY: 60,
              transformOrigin: "right center",
              duration: 0.8,
              ease: "power3.out",
            });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={divWrapperRef}
      className="w-full mt-3 grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-4 md:px-12 py-8
      bg-[#fffaf0] rounded-xl shadow-md"
    >
      {/* Left Image */}
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

      {/* Right Text Content */}
      <div className="flex flex-col gap-y-6 text-center md:text-left">
        <h1
          ref={textRef}
          className="text-cafe-bronze ml-6 font-cookie-regular text-3xl md:text-6xl text-brown-800 leading-tight"
        >
          Brewed with love — You&apos;ve got to try it!
        </h1>

        <p
          ref={paragraphRef}
          className="font-neue-bold md:text-3xl text-gray-700 text-xl"
        >
          Every cup at Beanzy is handcrafted to warm your soul. Whether you&apos;re
          craving a strong espresso or a silky latte, we&apos;ve got something special
          brewing for you.
        </p>
      </div>

      {/* Extra Text Block */}
      <div
        ref={extraTextRef}
        className="text-black font-neue-bold md:text-3xl text-xl"
      >
        Beanzy isn&apos;t just about beans — it&apos;s a full-blown flavor fest packed with creamy delights and savory surprises.
      </div>

      {/* Right Image */}
      <div className="text-black">
        <Image
          ref={coffeeNewspaper}
          className="w-full h-64 md:h-[400px] object-cover rounded-lg"
          src="/Images/488396751_18045681536606907_7130290156401140216_n.jpg"
          width={200}
          height={200}
          quality={100}
          alt="coffee-newspaper"
        />
      </div>

      {/* CTA Button */}
      <div ref={buttonRef}>
        <button className="px-6 py-3 text-cafe-dark bg-brown-700 hover:bg-brown-800 transition rounded-full text-sm md:text-xl font-semibold underline">
          Explore Our Menu
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
