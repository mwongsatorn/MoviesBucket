/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    plugin(function ({ addVariant }) {
      addVariant("childs", "& > *");
    }),
  ],
};
