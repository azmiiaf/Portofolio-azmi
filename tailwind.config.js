/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: '#0a0a0a', lime: '#b6f500', violet: '#5b2bff', paper: '#f4f4f0' },
      fontFamily: {
        sans: ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        devanagri: ['var(--font-devanagri)', "space-mono"]
      },
    },
  },
  plugins: [],
}
