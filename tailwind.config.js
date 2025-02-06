import { withAnimations } from "animated-tailwindcss";

/** @type {import('tailwindcss').Config} */
export default withAnimations({
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        blueToBeige:
          "linear-gradient(180deg, rgba(11, 191, 251, 1) 1%, rgba(11, 191, 251, 1) 35%, rgba(240, 234, 214, 1) 50%, rgba(240, 234, 214, 1) 100%)",
      },
      boxShadow: {
        "button": '-10px 10px #000'
      }
    },
  },
  plugins: [],
});
