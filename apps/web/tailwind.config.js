/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'morocco-red': '#C1272D',
        'morocco-green': '#006233',
        'morocco-gold': '#FFD700',
        'casablanca-blue': '#1E3A8A',
        'casablanca-light': '#F1F5F9',
        // Dark mode colors
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'dark-border': '#334155',
        'dark-text': '#F1F5F9',
        'dark-text-secondary': '#94A3B8',
      },
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}