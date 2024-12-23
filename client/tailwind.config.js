/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add a custom font (for example, Google Fonts or Font Awesome if it supports text styles)
        awesome: ['"Awesome Font"', "sans-serif"], // Replace with the actual font name you want to use
      },
      backgroundImage: {
        // Custom background image for the welcome page
        'welcome-bg': "url('/Users/shahina-works/entry_projects/food_order/client/src/assets/images/top-view-assortment-with-food-frame-tableware_23-2148247890.jpg')", // Update with the correct path to your image
      },
    },
  },
  plugins: [],
}
