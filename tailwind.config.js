/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d0b1a',
        surface: '#13111f',
        card: '#1a1730',
        border: '#2a2550',
        accent: '#9B7FE8',
        'accent-light': '#b89ff0',
        'accent-dim': '#6b58b0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'count-up': 'countUp 1s ease-out forwards',
        'shake': 'shake 0.4s ease',
        'spin-slow': 'spin 1s linear infinite',
        'bar-fill': 'barFill 1s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        barFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--bar-width)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(155,127,232,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(155,127,232,0.7)' },
        },
      },
    },
  },
  plugins: [],
}
