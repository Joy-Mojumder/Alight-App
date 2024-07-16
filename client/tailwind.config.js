import daisyui from "daisyui";
import scrollbar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    scrollbar,
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-patla": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#57534e  #292524",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
