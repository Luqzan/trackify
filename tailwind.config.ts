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
        accent: "#03e5a6",
        "accent-subtle": "#117b62",
        "accent-dark": "#1d4138",
        "table-row": "var(--table-row)",
        "topbar-background": "#333333",
        background: "var(--background)",
        "background-inverse": "var(--background-inverse)",
        foreground: "var(--foreground)",
        "foreground-subtle": "var(--foreground-subtle)",
        "foreground-inverse": "var(--foreground-inverse)",
        border: "var(--border)",
        // elevation: {
        //   1: "var(--elevation-1)",
        //   2: "var(--elevation-2)",
        //   3: "var(--elevation-3)",
        //   4: "var(--elevation-4)",
        // },
      },
    },
  },
  plugins: [],
} satisfies Config;
