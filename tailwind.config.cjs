const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Gill Sans',
          'Century Gothic',
          'Verdana',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
