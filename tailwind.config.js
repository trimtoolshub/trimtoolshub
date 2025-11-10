/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1f6feb',
        'brand-secondary': '#f97316',
        'brand-surface': '#070b1a',
        'brand-muted': '#1e293b',
        'brand-accent': '#22d3ee',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          '"Liberation Mono"',
          'monospace',
        ],
      },
      boxShadow: {
        focus: '0 0 0 4px rgba(34, 211, 238, 0.35)',
      },
      backgroundImage: {
        'grid-small':
          'linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-small': '24px 24px',
      },
    },
  },
  plugins: [],
};


