import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-inverse": "var(--background-inverse)",
        foreground: "var(--foreground)",
        "foreground-inverse": "var(--foreground-inverse)",
        elevation: {
          1: "var(--elevation-1)",
          2: "var(--elevation-2)",
          3: "var(--elevation-3)",
          4: "var(--elevation-4)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
