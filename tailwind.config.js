/** @type {import('tailwindcss').Config} */
// Tailwind v4: configuration lives in globals.css @theme block.
// This file is kept only for IDE tooling content path hints.
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/theme/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}
