import "./globals.css";
import ProgressBar from "@/components/ProgressBarWrapper";
import { ToastContainer } from "react-toastify";
import localFont from "next/font/local"
import { GeistSans } from "geist/font/sans"
import NavBar from "@/components/NavBar";
import LenisProvider from "@/components/LenisProvider";
import MouseCircle from "@/components/MouseHover";
const NeueMontrealRegular = localFont({
  src: [
    {
      path: "../font/regular_7987ufyd_neue.otf",
      weight: '400',
      style: 'normal'
    }
  ],
  variable: "--font-neue-regular",
  display: "fallback"
})
const Cookieregular = localFont({
  src: [
    {
      path: "../font/cookie_uyti8_regu7shlarTdh0b.ttf",
      weight: '400',
      style: 'normal'
    }
  ],
  variable: "--font-cookie-regular",
  display: "auto"
})
const NeueMontrealBold = localFont({
  src: [
    {
      path: "../font/bold_79578dkjtj_neue.otf",
      weight: '400',
      style: 'normal'
    }
  ],
  variable: "--font-neue-bold",
  display: "fallback"
})
const brewFont = localFont({
  src: [
    {
      path: "../font/eldritchgdwwetTTcsx_6987vanguard.otf",
      weight: "400",
      style: "normal"
    }
  ],
  variable: "--font-brew-cafe",
  display: "swap"
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} 
    ${NeueMontrealRegular.variable} ${brewFont.variable}
     ${NeueMontrealBold.variable} ${Cookieregular.variable}`} suppressHydrationWarning={true}>
      <body>
        <ProgressBar>
          <LenisProvider>
            <ToastContainer theme="dark" autoClose={2000} />
            <MouseCircle className="fixed hidden md:block -top-6 -left-6 z-[9999] w-12 h-12 
    rounded-full border border-white
    mix-blend-difference pointer-events-none
    bg-white
    -translate-x-1/2 -translate-y-1/2"/>
            <NavBar />
            {children}
          </LenisProvider>
        </ProgressBar>
      </body>
    </html>
  );
}
