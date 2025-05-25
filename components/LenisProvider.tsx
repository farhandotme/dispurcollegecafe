// components/LenisProvider.tsx
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

  return <ReactLenis root>{children}</ReactLenis>;
};

export default LenisProvider;
