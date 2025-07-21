/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          800: "#1e3a8a",
          900: "#1e40af",
        },
        green: {
          600: "#059669",
        },
        orange: {
          500: "#ea580c",
          600: "#ea580c",
        },
        red: {
          600: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
