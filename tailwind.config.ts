import type { Config } from "tailwindcss";
import type { ThemeConfig } from 'antd';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"SpaceGrotesk"', "sans-serif"],
      },
      colors: {
        gold: "#DFB511",
        lightAsh: "#1D1F26",
        darkAsh: "#101010",
        lightGray: "#ECEFE1",
      },
      backgroundImage: {
        searchIcon: "url('../src/assets/search-normal.svg')",
        filterIcon: "url('../src/assets/filter-search.svg')",
      },
    },
  },

};
export default config;
