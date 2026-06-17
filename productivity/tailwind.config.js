/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        olive: {
          ink: "#4d4f46",
          deep: "#23251d",
          border: "#bfc1b7",
          light: "#b6b7af",
          placeholder: "#9ea096",
          cream: "#eeefe9",
          lightSage: "#e5e7e0",
          parchment: "#fdfdf8",
          tan: "#d4c9b8"
        },
        posthog: { orange: "#F54E00", amber: "#F7A501" }
      },
      fontFamily: {
        display: ['"IBM Plex Sans Variable"', 'IBM Plex Sans', '-apple-system', 'system-ui', 'Segoe UI', 'sans-serif'],
        body: ['"IBM Plex Sans Variable"', 'IBM Plex Sans', '-apple-system', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      }
    }
  },
  plugins: []
}
