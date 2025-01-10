/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      boxShadow: {
        'primary': '10px 10px 25px #d7dadd, -10px -10px 25px #ffffff',
        'secondary': '5px 5px 15px #d1d9e6, -5px -5px 15px #fff',
      },
      keyframes: {
        swipe: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        swipe: "swipe linear infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
}