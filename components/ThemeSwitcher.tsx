"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
const ThemeSwitcher = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
        className="theme-toggle-button"
        >
            {resolvedTheme === "dark" ? <FiSun size={24} /> : <FiMoon />}
        </button>
    );
};
export default ThemeSwitcher;
