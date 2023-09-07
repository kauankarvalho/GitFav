/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  safelist: [
    "h-[5.6rem]",
    "w-[5.6rem]",
    "gap-[1.8rem]",
    "rounded-full",
    "text-[#F75A68]",
    "last:rounded-b-[1.2rem]",
    "odd:bg-[rgba(6,_22,_27,_0.5)]",
    "even:bg-[#06181C]",
    "even:bg-[#06181C]",
    "max-w-min",
    "hidden",
  ],

  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      robotoMono: ["Roboto Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [],
}
