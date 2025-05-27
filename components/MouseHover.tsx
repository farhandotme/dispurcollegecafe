"use client";

import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import gsap from "gsap";

type MouseHoverProp = {
  className: string;
};
export default function MouseCircle({ className }: MouseHoverProp) {
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

    if (circle) gsap.set(circle, { scale: 0 });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
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
