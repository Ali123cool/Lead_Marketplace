/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './Public/index.html'],  // Add your paths to files here
  theme: {
    extend: {
      colors: {
        primary: '#282B32',        // Primary color
        secondary: '#252424',      // Secondary color
        button1: '#9C183D',        // Accent color (button1)
        button2: '#01017C',        // Secondary button color
        bodyText: '#FFFFFF',       // Main body text color
        textSecondary: '#000000',  // Secondary text color
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif'],    // Roboto for body
        header: ['Roboto', 'sans-serif'],  // Roboto for headers
        logo: ['Jaro', 'sans-serif'],      // Jaro for logo text
      },
      fontSize: {
        h1: 'clamp(2.5rem, 5vw, 4rem)',    // Responsive H1
        h2: 'clamp(2rem, 4vw, 3rem)',      // Responsive H2
        h3: 'clamp(1.75rem, 3vw, 2.5rem)', // Responsive H3
        body: 'clamp(1rem, 1.5vw, 1.25rem)' // Responsive body text
      },
      fontWeight: {
        logo: '800',    // Extra bold for logo
        h1: '700',      // Bold for H1
        h2: '600',      // Semi-bold for H2
        h3: '500',      // Medium for H3
        body: '400'     // Regular for body text
      }
    },
  },
  plugins: [],
};
