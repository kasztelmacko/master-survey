/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22333b',
        secondary: '#10B981',
        accent: '#F59E0B',
        background: '#FFFFF',
        text: '#0a0908',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter as the default font
      },
    },
  },
  plugins: [],
};