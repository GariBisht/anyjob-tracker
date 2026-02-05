/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // use public asset for reliable serving
        'hero': "url('/hero-bg.svg')",
      },
    },
  },
  plugins: [],
};