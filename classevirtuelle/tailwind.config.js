module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
       gb: '#333333',
       gg: '#4d4d4d', 
      },

      fontFamily: {
        logo: [ "Audiowide", "sans-serif" ],
        text: [ "Quantico", "sans-serif" ],
    },

   },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}