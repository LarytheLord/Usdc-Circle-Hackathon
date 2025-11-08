/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'arc-blue': '#1E3A8A',
        'yield-green': '#10B981',
        'warning-amber': '#F59E0B',
        'danger-red': '#EF4444',
      }
    },
  },
  plugins: [],
}