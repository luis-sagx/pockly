/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Sistema de diseño PostHog-inspired (DESIGN.md)
        olive: {
          ink: "#4d4f46",      // Primary text - olive-gray cálido
          deep: "#23251d",      // Link text, high-emphasis headings
          border: "#bfc1b7",   // Primary border - sage-tinted gray
          light: "#b6b7af",     // Secondary border
          placeholder: "#9ea096", // Placeholder text, disabled
          cream: "#eeefe9",     // Input backgrounds, secondary surfaces
          lightSage: "#e5e7e0", // Button backgrounds, tertiary surfaces
          parchment: "#fdfdf8", // Warm Parchment - page background
          tan: "#d4c9b8",      // Featured button backgrounds
        },
        posthog: {
          orange: "#F54E00",   // Hidden brand accent - hover surprises
          amber: "#F7A501",    // Secondary hover accent
        },
        // Colores existentes del proyecto (mantener para compatibilidad)
        brand: {
          50: "#f0eeff",
          100: "#e0dbff",
          200: "#c4baff",
          300: "#a193f8",
          400: "#8272ee",
          500: "#6655e0",
          600: "#5244c8",
          700: "#3e33a0",
          800: "#2a2270",
          900: "#1a1548",
          950: "#130f24",
        },
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
    },
  },
  plugins: [],
}