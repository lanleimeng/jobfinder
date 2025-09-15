/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.css",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
       colors: {
        primary: "#2563EB",
        accent: "#14B8A6",
        background: "#F9FAFB",
        foreground: "#0C301E",
      },
    },
  },
  plugins: [],
};
