/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        softBg: '#F8F4FF',
        primary: '#6A4FE0',
        'primary-soft': '#EDEBFF',
        muted: '#6b6b83',
      },
      boxShadow: {
        soft: '0 8px 20px rgba(90,75,180,0.06)',
      },
    },
  },
  plugins: [],
};
