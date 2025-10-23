/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-bg': '#0F172A', // Koyu Mavi Gri (Slate-900)
        'eco-border': 'rgba(56, 189, 248, 0.3)', // Sky-500 border (şeffaf)
        'eco-glow': '#0EA5E9', // Sky-600 (parlama için)
        'eco-pulse': '#67E8F9', // Cyan-300 (ışık darbesi için)
        'eco-error': '#F43F5E', // Rose-500 (hata rengi)
      },
      boxShadow: {
        'glow-sky': '0 0 25px rgba(14, 165, 233, 0.5)', // Parlama
        'glow-error': '0 0 25px rgba(244, 63, 94, 0.6)', // Hata parlaması
      },
      // Nefes alma animasyonu
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        }
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite', // Yavaş nefes alma
      }
    },
  },
  plugins: [],
}