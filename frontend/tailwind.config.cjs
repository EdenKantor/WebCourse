const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class', // Enable dark mode using 'class' strategy
  content: ["./src/**/*.{html,js,jsx}"], 
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out", 
        pulseSlow: "pulse 3s infinite", 
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      colors: {
        darkBg: "#1a202c", // Custom dark mode background
        lightBg: "#ffffff", // Custom light mode background
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
