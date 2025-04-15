// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-gray-800',
    'text-white',
    'bg-accent-800',
    'text-accent-500',
    'dark:bg-neutral-900'
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        white: colors.white,
        accent: {
          50: '#e7f0ff',
          100: '#c2d8ff',
          200: '#9dbfff',
          300: '#78a7ff',
          400: '#538fff',
          500: '#2e77ff',
          600: '#145fe6',
          700: '#104ab3',
          800: '#0c3590',
          900: '#08206c'
        },
        pink: colors.pink,
        blue: colors.blue,
        neutral: colors.neutral
      }
    }
  },
  plugins: []
}