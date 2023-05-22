const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      //
      // brand colors
      myPrimaryBrandColor: 'orange',
      //
      //
      // error color
      myPrimaryErrorColor: '#d60000',
      myPrimarySuccessColor: '#16a34a',
      // gray colors
      myPrimaryLightGrayColor: '#e2e8f0',
      myPrimaryMediumGrayColor: '#9ca3af',
      myPrimaryDarkGrayColor: '#111827',

      //

      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      indigo: colors.indigo,
      yellow: colors.amber,
      red: colors.red,
      fuchsia: colors.fuchsia,
      pink: colors.fuchsia,
      violet: colors.violet,
    },
    extend: {
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
