/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-bg': '#030712', // Çok çok koyu gri/siyah
        'neon-cyan': '#00FFFF',
        'widget-border': 'rgba(0, 255, 255, 0.2)', // Neon cyan border (şeffaf)
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.4)', // Odaklanma parlaması
      }
    },
  },
  plugins: [],
}