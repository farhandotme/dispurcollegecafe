import { ThemeProvider  } from "next-themes";
interface ThemeProviderProps {
    children : React.ReactNode
}
const ThemeProviderWrapper = ({children }:ThemeProviderProps) =>{
    return (
        <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
            {children}
        </ThemeProvider>
    )
}
export default ThemeProviderWrapper