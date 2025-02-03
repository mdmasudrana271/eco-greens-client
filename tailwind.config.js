/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        wellImg: "url('/src/assets/bestsell/greencactus.jpg')",
        blackOverlay:
          // "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
          "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);",
      },
      colors: {
        customGreen: "rgb(23, 24, 19)", // You can name it anything
      },
    },
  },
  plugins: [require("daisyui")],
};
