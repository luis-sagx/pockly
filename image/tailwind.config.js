/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Sistema de diseño PostHog-inspired (DESIGN.md)
        olive: {
          ink: "#4d4f46",         // Primary text - olive-gray cálido
          deep: "#23251d",         // Link text, high-emphasis headings
          border: "#bfc1b7",      // Primary border - sage-tinted gray
          light: "#b6b7af",       // Secondary border
          placeholder: "#9ea096",  // Placeholder text, disabled
          cream: "#eeefe9",        // Input backgrounds, secondary surfaces
          lightSage: "#e5e7e0",    // Button backgrounds, tertiary surfaces
          parchment: "#fdfdf8",    // Warm Parchment - page background
          tan: "#d4c9b8",        // Featured button backgrounds
        },
        // Colores directos para uso便利
        "olive-parchment": "#fdfdf8",
        "olive-deep": "#23251d",
        "olive-ink": "#4d4f46",
        "olive-border": "#bfc1b7",
        "olive-cream": "#eeefe9",
        "olive-light": "#b6b7af",
        "olive-lightSage": "#e5e7e0",
        "olive-tan": "#d4c9b8",
        "olive-placeholder": "#9ea096",
        "olive-ink/70": "rgba(77, 79, 70, 0.7)",
        "olive-ink/80": "rgba(77, 79, 70, 0.8)",
        posthog: {
          orange: "#F54E00",
          amber: "#F7A501",
        },
        "posthog-orange": "#F54E00",
        "posthog-orange/10": "rgba(245, 78, 0, 0.1)",
        "amber-gold": "#F7A501",
        tomato: {
          50: "#fdf8f5",
          100: "#f9ede4",
          200: "#f1dacc",
          300: "#e9b9a1",
          400: "#df9474",
          500: "#d17352",
          600: "#b05d41",
          700: "#8f4b34",
        },
      },
      fontFamily: {
        display: ['"IBM Plex Sans Variable"', 'IBM Plex Sans', '-apple-system', 'system-ui', 'Avenir Next', 'Avenir', 'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Arial'],
        body: ['"IBM Plex Sans Variable"', 'IBM Plex Sans', '-apple-system', 'system-ui', 'Avenir Next', 'Avenir', 'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Arial'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New'],
      },
      fontSize: {
        'display': ['30px', { lineHeight: '1.20', letterSpacing: '-0.75px', fontWeight: '800' }],
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}