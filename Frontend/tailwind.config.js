module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#011714',
        secondary: '#052326',
        tertiary: '#252424',
        button: {
          primary: '#085c31',
          secondary: '#06415c',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#000000',
          tertiary: '#757575',
        },
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif'],
        header: ['Roboto', 'sans-serif'],
        logo: ['Jaro', 'sans-serif'],
      },
      fontSize: {
        h1: 'clamp(2rem, 4vw, 3rem)',
        h2: 'clamp(1.75rem, 3.5vw, 2.5rem)',
        h3: 'clamp(1.5rem, 3vw, 2rem)',
        h4: '1.25rem',
        bodyPrimary: '1rem',
        bodySecondary: '0.875rem',
        finePrint: '0.75rem',
        logo: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      },
      fontWeight: {
        h1: '700', // Bold for heading 1
        h2: '600', // Semi-bold for heading 2
        h3: '500', // Medium for heading 3
        h4: '400', // Normal for heading 4
        bodyPrimary: '400', // Normal for body text
        bodySecondary: '300', // Light for secondary body text
        finePrint: '300', // Light for fine print
        logo: '700', // Bold for logo text
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 3px 4px -1px rgba(0, 0, 0, 0.1), 0 2px 3px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 8px 12px -3px rgba(0, 0, 0, 0.1), 0 3px 4px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
