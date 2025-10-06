/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add an 'accent' color token that maps to the app's lime green primary
        accent: {
          DEFAULT: '#84cc16',
          500: '#84cc16',
          600: '#65a30d',
          400: '#bef264'
        }
      }
    },
  },
  plugins: [],
};