// tailwind.config.js
import plugin from "tailwindcss/plugin";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#333a3f',
        lightBg: '#f5f5f5',
        lightText: '#50B498'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
      },
      lineHeight: {
        'custom-tight': '0.6',
      },
      textColor: {
        'transparent': 'transparent',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};

export default config;
