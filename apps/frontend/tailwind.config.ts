import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@movie-app/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      utilities: {
        ".card-base": {
          "@apply rounded-lg bg-slate-800 transition-all": {},
        },
        ".card-hover": {
          "@apply transition-transform hover:scale-105": {},
        },
        ".text-muted": {
          "@apply text-slate-400": {},
        },
        ".text-hover": {
          "@apply hover:text-white transition-colors": {},
        },
        ".container-padding": {
          "@apply container mx-auto px-4": {},
        },
        ".overlay-gradient": {
          "@apply bg-gradient-to-t from-black/80 via-transparent": {},
        },
        ".slide-up": {
          "@apply translate-y-full transition-transform group-hover:translate-y-0": {},
        },
        ".nav-link": {
          "@apply transition-colors text-slate-300 hover:text-white": {},
        },
        ".nav-link-active": {
          "@apply font-medium text-white": {},
        },
        ".button-primary": {
          "@apply bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50": {},
        },
        ".button-secondary": {
          "@apply border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800": {},
        },
        ".error-text": {
          "@apply text-red-400": {},
        },
        ".success-text": {
          "@apply text-green-400": {},
        },
      },
    },
  },
};

export default config;
