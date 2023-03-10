/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ee4d2d",
        link: "#4582ee",
        gray555: "#5a5a5a"
      }
    }
  },
  plugins: []
};
