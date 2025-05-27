"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type RandomBlurOverlayProps = {
  children: React.ReactNode;
  blurDuration?: number;     // How long each blur lasts (sec)
  interval?: number;         // How often new blur targets are chosen (ms)
  maxBlur?: number;          // Max blur amount in px
  maxTargets?: number;       // Max elements to blur at once
  className?: string;
};

export default function RandomBlurOverlay({
  children,
  blurDuration = 0.6,
  interval = 1500,
  maxBlur = 6,
  maxTargets = 2,
  className = "",
}: RandomBlurOverlayProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const children = Array.from(wrapper.querySelectorAll<HTMLElement>("*"));
    const applyRandomBlur = () => {
      const targets = children.sort(() => 0.5 - Math.random()).slice(0, maxTargets);

      targets.forEach((el) => {
        const blurAmount = Math.random() * maxBlur;

        gsap.to(el, {
          filter: `blur(${blurAmount}px)`,
          duration: blurDuration,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(el, {
              filter: "blur(0px)",
              duration: blurDuration,
              ease: "power2.out",
            });
          },
        });
      });
    };

    const intervalId = setInterval(applyRandomBlur, interval);
    return () => clearInterval(intervalId);
  }, [blurDuration, interval, maxBlur, maxTargets]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
