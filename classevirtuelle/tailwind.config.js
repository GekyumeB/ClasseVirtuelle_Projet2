module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gb: "#333333",
        gg: "#4d4d4d",
      },
      fontFamily: {
        logo: ["Audiowide", "sans-serif"],
        text: ["Quantico", "sans-serif"],
      },
    },
  },
  plugins: [],
};
