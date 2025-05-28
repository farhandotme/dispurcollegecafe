import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cafe: {
					dark: "#4b2e2e",
					light: "#f5e6ca",
					tan: "#d2b48c",
					orange: "#ff8a00",
					mint: "#a3f7bf",
					cream: "#fffce1",
					bronze: "#CD7F32",
					deepGreen: "#355e3b",      // Rich forest green
					softPink: "#f7c6c7",       // Gentle pink contrast
					burntSienna: "#e97451",    // Warm, earthy red-orange
					slateGray: "#708090",      // Muted gray-blue
					warmGray: "#a89f91",       // Cozy, neutral gray
					sand: "#f4c97b",           // Muted gold sand tone
					olive: "#808000",          // Earthy green for natural vibe
					blush: "#f9c5bd",          // Light blush pink for softness
					espresso: "#362c2a",       // Deep brown-black
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				"neue-regular": 'var(--font-neue-regular)',
				'neue-bold': 'var(--font-neue-bold)',
				"geist": 'var(--font-geist-sans)',
				"cookie-regular": `var(--font-cookie-regular)`,
				"brew" : "var(--font-brew-cafe)"
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
	darkMode: ["class", "class"]
} satisfies Config;
