"use client";
import { LenisProps, ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (e: LenisProps) => {
      
      console.log("Lenis scroll:", e);
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return <ReactLenis 
  options={{
    duration: 1.6,
    touchMultiplier: 3, // Try 1.5–3 for more responsiveness on touch
    syncTouch : true,
    syncTouchLerp : 2,
    gestureOrientation : "vertical",
    autoResize: true,   // Ensures Lenis recalculates on screen resize/orientation change
  }}
  root>{children}</ReactLenis>;
};

export default LenisProvider;
