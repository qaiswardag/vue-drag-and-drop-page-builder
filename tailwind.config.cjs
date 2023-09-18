const defaultTheme = require('tailwindcss/defaultTheme');

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
        // Custom colors
        myPrimaryBrandColor: '#000000',
        myPrimaryLinkColor: '#2563eb',

        myPrimaryLightGrayColor: '#e2e8f0',
        myPrimaryMediumGrayColor: '#9ca3af',
        myPrimaryDarkGrayColor: '#111827',

        myPrimaryErrorColor: '#d60000',
        myPrimarySuccesColor: '#16a34a',
      },
      fontFamily: {
        sans: [
          'Jost',
          'Raleway',
          'sans-serif',
          'Georgia',
          'ui-serif',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
