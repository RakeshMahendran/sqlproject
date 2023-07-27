/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#5880CE",
          200: "#07A1BE",
          300: "#4D75BD",
          400: "#6394E2",
          500: "#5C86C5",
          600: "#5A77A4",
          700: "#526FBA",
          800: "#5D8CB6",
          900: "#5177CD",
          1000: "#5792C5",
          1100: "#5686AD",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
