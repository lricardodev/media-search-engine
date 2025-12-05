import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "brand-accent": "#39FF14",
                "netflix-black": "#141414",
                "netflix-gray": "#E5E5E5",
                "netflix-dark-gray": "#181818",
            },
        },
    },
    plugins: [],
};
export default config;
