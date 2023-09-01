/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#6c63ff",
        "dark-blue": "#3f3d56",
      },
    },
  },
  plugins: [],
};
