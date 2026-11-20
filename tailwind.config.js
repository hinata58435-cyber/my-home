/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f3f6f3',
          100: '#e3ebe4',
          200: '#c7d6c9',
          300: '#a3bba6',
          400: '#829582',
          500: '#6b806c',
          600: '#566857',
          700: '#454D43',
          800: '#394038',
          900: '#2f352e',
        },
        beige: {
          50: '#fbf9f4',
          100: '#f6f1e8',
          200: '#E9E1D2',
          300: '#dccfb6',
          400: '#cdb894',
        },
        ivory: '#FAF8F3',
        wood: {
          light: '#c9b491',
          DEFAULT: '#B69B7D',
          dark: '#9a8060',
        },
        dark: '#454D43',
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(69, 77, 67, 0.12)',
        card: '0 6px 30px -10px rgba(69, 77, 67, 0.25)',
        lift: '0 18px 50px -12px rgba(69, 77, 67, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 3s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
