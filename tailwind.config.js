/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "main-red": {
          100: "#FC787F",
          200: "#FC505A",
          300: "#FB2A36",
          400: "#F50512",
          500: "#CD040F"
        },
        "typo": {
          100: "#FFFFFF",
          150: "#F6F6F6",
          200: "#DEDEDE",
          300: "#BABABA",
          400: "#969696",
          500: "#737373",
          600: "#4F4F4F",
          700: "#2B2B2B",
          800: "#080808"
        },
        "feedback": {
          "success": "#76C448",
          "warning": "#FFBF3F",
          "info": "#44A9FC",
          "danger": "#CD040F"
        },
        "badge": {
          "history": "#FFDA46",
          "oportunity": "#D015FF",
          "tecnology": "#6FE927",
          "news": "#46A6FF",
          "offer": "#001CA8",
          "programation": "#FF5935"
        }
      }
    },
    "fontSize": {
      "highlight": "45px",
      "title": "40px",
      "section": "24px",
      "section-subtitle": "18px",
      "normal": "16px",
      "image-subtitle": "14px"
    }
  },
  plugins: [
    daisyui
  ],
}