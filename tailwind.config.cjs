const defaultTheme = require('tailwindcss/defaultTheme');
// const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './public/**/*.json',
  ],
  theme: {
    extend: {
      colors: {
        // Your existing color definitions
        myPrimaryBrandColor: 'purple',
        myPrimaryErrorColor: '#d60000',
        myPrimaryLinkColor: '#6a5acd',
        myPrimaryLightGrayColor: '#e2e8f0',
        myPrimaryMediumGrayColor: '#9ca3af',
        myPrimaryDarkGrayColor: '#111827',
      },
      fontFamily: {
        sans: [
          'Jost',
          'Raleway',
          'sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
