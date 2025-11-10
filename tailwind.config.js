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
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        gaming: {
          dark: '#0a0a0a',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          pink: '#ec4899',
        }
      },
      backgroundImage: {
        'gradient-gaming': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)',
      }
    },
  },
  plugins: [],
}