/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ets-red': '#CF1F38',
        'ets-darkred': '#A51830',
        compatibility: {
          high: '#4CAF50',    // Green
          medium: '#FFA726',  // Orange
          low: '#EF5350'      // Red
        }
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'header': '0 2px 4px rgba(0,0,0,0.1)',
        'card': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}



