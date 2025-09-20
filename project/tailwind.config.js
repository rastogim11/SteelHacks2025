/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(217.2 32.6% 17.5%)',
        input: 'hsl(217.2 32.6% 17.5%)',
        ring: 'hsl(212.7 26.8% 83.9%)',
        background: 'hsl(222.2 84% 4.9%)',
        foreground: 'hsl(210 40% 98%)',
        primary: {
          DEFAULT: '#0B2B5B',
          50: '#E8F0FF',
          100: '#D1E1FF',
          200: '#A3C3FF',
          300: '#75A5FF',
          400: '#4787FF',
          500: '#1969FF',
          600: '#0B2B5B',
          700: '#082049',
          800: '#051537',
          900: '#030A25',
          foreground: 'hsl(210 40% 98%)',
        },
        accent: {
          DEFAULT: '#3AAFA9',
          50: '#F0FCFB',
          100: '#E1F9F8',
          200: '#C3F3F1',
          300: '#A5EDEA',
          400: '#87E7E3',
          500: '#3AAFA9',
          600: '#2E8C87',
          700: '#236965',
          800: '#174643',
          900: '#0C2321',
          foreground: 'hsl(222.2 84% 4.9%)',
        },
        text: '#E6EEFC',
        muted: {
          DEFAULT: '#8EA2C9',
          foreground: 'hsl(215.4 16.3% 46.9%)',
        },
        secondary: {
          DEFAULT: 'hsl(217.2 32.6% 17.5%)',
          foreground: 'hsl(210 40% 98%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 62.8% 30.6%)',
          foreground: 'hsl(210 40% 98%)',
        },
        card: {
          DEFAULT: 'hsl(217.2 32.6% 17.5%)',
          foreground: 'hsl(210 40% 98%)',
        },
        popover: {
          DEFAULT: 'hsl(217.2 32.6% 17.5%)',
          foreground: 'hsl(210 40% 98%)',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};