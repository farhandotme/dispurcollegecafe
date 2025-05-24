"use client"
import { ProgressProvider } from "@bprogress/next/app";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface ProgressBarProp {
  children : React.ReactNode
}
const ProgressBar = ({children} : ProgressBarProp) =>{
   const [randomcolor , randomsetColor] = useState<string | null>(null);
   const pathname : string = usePathname();
   useEffect(()=>randomsetColor(getRandomColor()), [pathname]);
   if(!randomcolor) return null;
    return (
        <ProgressProvider height="2px" color={randomcolor} shallowRouting={true} options={{showSpinner : false}}>
          {children}
        </ProgressProvider>
    )
}

export default ProgressBar