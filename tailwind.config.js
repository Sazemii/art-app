/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        "noto-sans": [
          "var(--font-noto-sans)",
          "Noto Sans",
          "system-ui",
          "sans-serif",
        ],
        "noto-cjk": [
          "Noto Sans SC",
          "Noto Sans JP",
          "Noto Sans KR",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
