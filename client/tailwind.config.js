/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        messiri: ["El Messiri", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        montaga: ["Montaga", "sans-serif"],
        monteCarlo: ["MonteCarlo", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
        cursiveFont: ["cursiveFont", "cursive"]

      },
    },
  },
  plugins: [],
}
