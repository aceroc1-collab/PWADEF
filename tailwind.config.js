/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#B8A06A',
        'gold-light': '#D4BC88',
        cyan: '#00D4FF',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
