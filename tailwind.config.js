/** @type {import('tailwindcss').Config} */
// TailwindCSS v4 – configuration is primarily CSS-based via @theme in globals.css.
// This file is kept for any v4 JS-based overrides (plugins, etc.).
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}
