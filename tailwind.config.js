/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color: {
          1: "#AC6AFF",
          2: "#FFC876",
          3: "#FF776F",
          4: "#7ADB78",
          5: "#858DFF",
          6: "#FF98E2",
        },
        orange3:"#FFF700",
        white1:"#F5FEFD",
         blue1:"#5A4BDA",
        orange1:"#f84a00",
        white: "#fff",
        lblue:"	#66abf9",
        orange:"#FFAE42",
        orange2:"#FB8500",
        bg:"#1c2020",
        black: "#000",
        transparent: "#ffffff00",
        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          50: "#C5C7D4",
          100: "#AFB2BF",
          200: "#999DAA",
          300: "#838894",
          400: "#6E727F",
          500: "#585D69",
          600: "#424854",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },
        richblue: {
          5: "#ECF5FF",
          25: "#C6D6E1",
          50: "#A0B7C3",
          100: "#7A98A6",
          200: "#537988",
          300: "#2D5A6A",
          400: "#073B4C",
          500: "#063544",
          600: "#042E3B",
          700: "#032833",
          800: "#01212A",
          900: "#001B22",
        },
        blue: {
          5: "#EAF5FF",
          25: "#B4DAEC",
          50: "#7EC0D9",
          100: "#47A5C5",
          200: "#118AB2",
          300: "#0F7A9D",
          400: "#0C6A87",
          500: "#0A5A72",
          600: "#074B5D",
          700: "#053B48",
          800: "#022B32",
          900: "#001B1D",
        },
        caribbeangreen: {
          5: "#C1FFFD",
          25: "#83F1DE",
          50: "#44E4BF",
          100: "#06D6A0",
          200: "#05BF8E",
          300: "#05A77B",
          400: "#049069",
          500: "#037957",
          600: "#026144",
          700: "#014A32",
          800: "#01321F",
          900: "#001B0D",
        },
        brown: {
          5: "#FFF4C4",
          25: "#FFE395",
          50: "#FFD166",
          100: "#E7BC5B",
          200: "#CFA64F",
          300: "#B89144",
          400: "#A07C39",
          500: "#88662D",
          600: "#705122",
          700: "#593C17",
          800: "#41260B",
          900: "#291100",
        },
        pink: {
          5: "#FFF1F1",
          25: "#FBC7D1",
          50: "#F79CB0",
          100: "#F37290",
          200: "#EF476F",
          300: "#D43D63",
          400: "#BA3356",
          500: "#9F294A",
          600: "#841E3E",
          700: "#691432",
          800: "#4F0A25",
          900: "#340019",
        },
        yellow: {
          5: "#FFF970",
          25: "#FFE83D",
          50: "#FFD60A",
          100: "#E7C009",
          200: "#CFAB08",
          300: "#B69507",
          400: "#9E8006",
          500: "#866A04",
          600: "#6E5503",
          700: "#553F02",
          800: "#3D2A01",
          900: "#251400",
        },
        "pure-greys": {
          5: "#F9F9F9",
          25: "#E2E2E2",
          50: "#CCCCCC",
          100: "#B5B5B5",
          200: "#9E9E9E",
          300: "#888888",
          400: "#717171",
          500: "#5B5B5B",
          600: "#444444",
          700: "#2D2D2D",
          800: "#171717",
          900: "#141414",
        },
  
        stroke: {
          1: "#26242C",
        },
        n: {
          1: "#FFFFFF",
          2: "#CAC6DD",
          3: "#ADA8C3",
          4: "#757185",
          5: "#3F3A52",
          6: "#252134",
          7: "#15131D",
          8: "#0E0C15",
          9: "#474060",
          10: "#43435C",
          11: "#1B1B2E",
          12: "#2E2A41",
          13: "#6C7275",
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
        ancient: ['Noto Serif', 'serif'],
        hindi:['Kalam','serif']
      },
      letterSpacing: {
        tagline: ".15em",
      },
      spacing: {
        0.25: "0.0625rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      opacity: {
        15: ".15",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      borderWidth: {
        DEFAULT: "0.0625rem",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient":
          "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]":
            {},
        },
        ".h1": {
          "@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
            {},
        },
        ".h2": {
          "@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
            {},
        },
        ".h3": {
          "@apply text-[2rem] leading-normal md:text-[2.5rem]": {},
        },
        ".h4": {
          "@apply text-[2rem] leading-normal": {},
        },
        ".h5": {
          "@apply text-2xl leading-normal": {},
        },
        ".h6": {
          "@apply font-semibold text-lg leading-8": {},
        },
        ".body-1": {
          "@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
            {},
        },
        ".body-2": {
          "@apply font-light text-[0.875rem] leading-6 md:text-base": {},
        },
        ".caption": {
          "@apply text-sm": {},
        },
        ".tagline": {
          "@apply font-grotesk font-light text-xs tracking-tagline uppercase":
            {},
        },
        ".quote": {
          "@apply font-code text-lg leading-normal": {},
        },
        ".button": {
          "@apply font-code text-xs font-bold uppercase tracking-wider": {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
      });
    }),
  ],
};