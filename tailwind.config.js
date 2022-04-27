module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        // uneven radii supremacy
        sm: '0.19rem',
        DEFAULT: '0.3125rem',
        md: '0.4375rem',
        lg: '0.5625rem',
        xl: '0.8125rem',
        '2xl': '1.0625rem',
        '3xl': '1.5625rem'
      },
      width: {
        xl: '50rem',
      },
      'height': {
        xl: '28rem',
      },
      'maxHeight': {
        xl: '28rem',
      }
    },
  },
  plugins: [],
}
