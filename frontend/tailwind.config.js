/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Scan tous les fichiers src pour classes Tailwind
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1E3A8A',  // Ton bleu charte
        'accent-orange': '#F59E0B', // Ton orange CTA
      },
    },
  },
  plugins: [],
};