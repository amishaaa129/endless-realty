module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // All JS/TS/React files in the src folder
    './components/**/*.{js,jsx,ts,tsx}', // All JS/TS/React files in the components folder
    './pages/**/*.{js,jsx,ts,tsx}', // All JS/TS/React files in the pages folder
    './public/**/*.html', // All HTML files in the public folder
    './layouts/**/*.{js,jsx,ts,tsx}', // If you have a layouts folder
    './utils/**/*.{js,ts}', // If you have a utils folder for helper functions
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideIn: 'slideIn 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
        bounceIn: 'bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};