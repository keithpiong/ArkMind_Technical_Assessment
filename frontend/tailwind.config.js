/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        appbar: 'var(--appbar-color)',
        body: 'var(--body-color)'
      },
    },
  },
  plugins: [],
};
