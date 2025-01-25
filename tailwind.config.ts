/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // A vibrant purple for primary actions
        secondary: '#10B981', // A green for secondary actions
        accent: '#F59E0B', // An orange for accents
        background: '#F9FAFB', // A light gray for backgrounds
        text: '#1F2937', // A dark gray for text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter as the default font
      },
    },
  },
  plugins: [],
};