/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        parchment: '#fdfdf8',
        olive: {
          DEFAULT: '#4d4f46',
          ink: '#4d4f46',
          deep: '#23251d',
          border: '#bfc1b7',
          light: '#b6b7af',
          placeholder: '#9ea096',
          cream: '#eeefe9',
          lightSage: '#e5e7e0',
          tan: '#d4c9b8',
        },
        posthog: {
          orange: '#F54E00',
          amber: '#F7A501',
        },
      },
      fontFamily: {
        display: ['"IBM Plex Sans"', '-apple-system', 'system-ui', 'Avenir', 'Segoe UI', 'Helvetica Neue', 'Arial'],
        body: ['"IBM Plex Sans"', '-apple-system', 'system-ui', 'Avenir', 'Segoe UI', 'Helvetica Neue', 'Arial'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas'],
      },
    },
  },
  plugins: [],
}