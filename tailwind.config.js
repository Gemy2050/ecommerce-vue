/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        secondary: "var(--secondary)",
        "secondary-hover": "var(--secondary-hover)",
        destructive: "var(--destructive)",
        "destructive-hover": "var(--destructive-hover)",
        success: "var(--success)",
        "success-hover": "var(--success-hover)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
      },
      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.5rem", fontWeight: "bold" }], // 36px
        h2: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "bold" }], // 30px
        h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "semibold" }], // 24px
        h4: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "semibold" }], // 20px
        h5: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "medium" }], // 18px
        h6: ["1rem", { lineHeight: "1.5rem", fontWeight: "medium" }], // 16px
      },
    },
  },
  plugins: [],
};
