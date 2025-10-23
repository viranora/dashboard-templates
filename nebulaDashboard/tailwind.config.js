/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
         'space-bg': '#030712', // Çok Koyu Mavi/Siyah
         'particle-blue': '#38BDF8', 
         'particle-purple': '#A78BFA',
         'particle-pink': '#EC4899',
       },
       // İsteğe Bağlı: Parçacık parlaması için boxShadow
       boxShadow: {
         'particle-glow': '0 0 15px rgba(255, 255, 255, 0.3)', 
       }
    },
  },
  plugins: [],
}