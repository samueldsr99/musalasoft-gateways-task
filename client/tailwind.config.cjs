// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        layout:
          "url(https://ping.gg/_next/static/media/background.d5ba1ba2.svg)",
      },
      backgroundSize: {
        landing: "120rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
