"use client";

import { useEffect } from "react";
import { motion, useMotionValue} from "framer-motion";
import gsap from "gsap";
declare type MouseHoverProp = {
  className : string
}
export default function MouseCircle({className} : MouseHoverProp) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const circle = document.getElementById("mouse-circle");

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        x.set(touch.clientX);
        y.set(touch.clientY);

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
      style={{ x, y }}
      className={className}
    />
  );
}
