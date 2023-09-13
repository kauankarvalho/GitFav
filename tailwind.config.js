/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  safelist: [
    "h-[2.5rem]",
    "w-[2.5rem]",
    "h-[5.6rem]",
    "w-[5.6rem]",
    "max-w-min",
    "gap-[1.8rem]",
    "border-b-[0.1rem]",
    "rounded-full",
    "text-[#F75A68]",
    "hidden",
    "hover:opacity-50",
    "odd:bg-[rgba(6,_22,_27,_0.5)]",
    "even:bg-[#06181C]",
    "even:bg-[#06181C]",
    "last:border-none",
    "max-[985px]:hidden",
    "max-[985px]:block",
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
