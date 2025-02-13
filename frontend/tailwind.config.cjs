// Tailwind CSS configuration file with dark mode support, custom animations, extended keyframes, and plugins.

const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: ["./src/**/*.{html,js,jsx}"], // Specify the files Tailwind should scan for class usage
  theme: {
    extend: {
      // Define custom animations
      animation: {
        fadeIn: "fadeIn 1s ease-in-out", // Smooth fade-in animation
        pulseSlow: "pulse 3s infinite", // Slow pulsing animation
        wiggle: 'wiggle 0.5s ease-in-out infinite', // Wiggling effect
      },
      // Define custom keyframes for animations
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 }, // Start with opacity 0
          "100%": { opacity: 1 }, // End with opacity 1
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' }, // Rotate left and right
          '50%': { transform: 'rotate(3deg)' }, // Rotate to the other side
        },
      },
      // Define custom colors
      colors: {
        darkBg: "#1a202c", // Custom background color for dark mode
        lightBg: "#ffffff", // Custom background color for light mode
      },
    },
  },
  // Add Tailwind plugins
  plugins: [
    require("@tailwindcss/forms"), // Plugin for better form element styling
    require("@tailwindcss/typography"), // Plugin for enhanced typography styles
  ],
};
