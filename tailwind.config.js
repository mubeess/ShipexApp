/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.{js,ts,jsx,tsx}',
    './App.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2F50C1',
        disabled: '#EAE7F2',
        gray: '#A7A3B3',
        tertiary: '#306810',
        white: '#ffffff',
        black: '#000000',
        lightGray: '#757281',
        inputBg: '#F4F2F8',
        iconColor: '#58536E',
        primaryLight: '#D9E6FD',
        borderColor: '#000',
        inputBgColor: '#F4F2F8',
      },
    },
  },
  plugins: [],
};
