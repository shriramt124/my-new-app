/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary cybersecurity theme colors
        cyber: {
          black: '#121a29',       // Deep background (lightened)
          darker: '#1a2332',      // Dark background (lightened)
          dark: '#1e293b',        // Slightly lighter dark background (lightened)
          DEFAULT: '#334155',     // Base color (lightened)
          light: '#94a3b8',       // Light accent (much lighter for better contrast)
          accent: '#0ea5e9',      // Primary accent (bright blue)
          glow: '#38bdf8',        // Glowing accent
          success: '#10b981',     // Success indicators
          warning: '#fbbf24',     // Warning indicators (brightened)
          yellow: '#fbbf24',      // Yellow for warnings (brightened)
          danger: '#f87171',      // Danger/alert indicators (brightened)
          red: '#f87171',         // Red for errors (brightened)
          purple: '#8b5cf6',      // Secondary accent
          teal: '#14b8a6',        // Tertiary accent
        },
      },
      boxShadow: {
        'cyber': '0 0 15px rgba(56, 189, 248, 0.5)',
        'cyber-sm': '0 0 5px rgba(56, 189, 248, 0.3)',
        'cyber-lg': '0 0 25px rgba(56, 189, 248, 0.7)',
        'cyber-inner': 'inset 0 0 5px rgba(56, 189, 248, 0.2)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'cyber-glow': 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(14, 165, 233, 0.05) 70%, rgba(10, 14, 23, 0) 100%)',
      },
    },
  },
  plugins: [],
}

