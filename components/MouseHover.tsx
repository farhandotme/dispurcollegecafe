"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

export default function MouseCircle() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const circle = document.getElementById("mouse-circle");

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 20);
      y.set(e.clientY - 20);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        x.set(touch.clientX - 20);
        y.set(touch.clientY - 20);
      }
    };

    const show = () => {
      gsap.to(circle, { scale: 1, duration: 0.3 });
      gsap.to(".hover-scale", { scale: 1.1, duration: 0.3 });
    };

    const hide = () => {
      gsap.to(circle, { scale: 0, duration: 0.3 });
      gsap.to(".hover-scale", { scale: 1, duration: 0.3 });
    };

    if (circle) gsap.set(circle, { scale: 0 });

    // Desktop
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", show);
    window.addEventListener("mouseleave", hide);

    // Mobile
    window.addEventListener("touchstart", show);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", hide);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mouseleave", hide);

      window.removeEventListener("touchstart", show);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", hide);
    };
  }, [x, y]);

  return (
    <motion.div
      id="mouse-circle"
      style={{ translateX: springX, translateY: springY }}
      className="fixed top-0 left-0 z-[9999] w-10 h-10 
        bg-transparent border-2 border-[#4B2E23] rounded-full 
        pointer-events-none"
    />
  );
}
