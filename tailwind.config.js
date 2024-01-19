/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.antlers.html",
    "./resources/**/*.antlers.php",
    "./resources/**/*.blade.php",
    "./resources/**/*.vue",
    "./content/**/*.md",
  ],

  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        opensans: "Open Sans",
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
