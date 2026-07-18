/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: '#0e3061', // Deep indigo - headings, primary text, nav
        signal: '#fe572a', // Signal orange - CTAs, links, accents, hover states
        teal: '#065964',   // Secondary accent - dividers, icons, tags
        ink: '#2a2a28',    // Charcoal - body text
        paper: '#f7f1e4',  // Paper cream - primary background
      },
      fontFamily: {
        display: ['"Fredoka"', 'sans-serif'],
        heading: ['"Fredoka"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        accent: ['"Kalam"', 'cursive'],
      },
    },
  },
  plugins: [],
}
