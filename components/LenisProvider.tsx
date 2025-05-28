"use client";
import { ReactLenis} from "lenis/react";
import { ReactNode} from "react";
const LenisProvider = ({ children }: { children: ReactNode }) => {
  return <ReactLenis 
  options={{
    duration: 2,
    touchMultiplier: 3, // Try 1.5–3 for more responsiveness on touch
    syncTouch : true,
    syncTouchLerp : 2,
    gestureOrientation : "vertical",
    autoResize: true,   // Ensures Lenis recalculates on screen resize/orientation change
  }}
  root>{children}</ReactLenis>;
};

export default LenisProvider;
