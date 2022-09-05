/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-color': '#acacac',
      },
    },
    container: {
      padding: '8rem',
    },
  },
  plugins: [],
}
