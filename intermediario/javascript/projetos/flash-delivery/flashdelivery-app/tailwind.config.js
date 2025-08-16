/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind preset enables RN-compatible utilities
  presets: [require('nativewind/preset')],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d6efd',
        bg: '#ffffff',
        text: '#0b2135',
        muted: '#6c757d',
        card: '#ffffff',
        border: '#e9ecef',
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
