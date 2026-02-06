import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0b0f',
        foreground: '#f4f5f7',
        surface: '#12141c',
        surfaceMuted: '#171a23',
        border: '#222536',
        muted: '#9aa0b5',
        accent: '#e5e7ff',
        glow: '#5663ff'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(86,99,255,0.2), 0 10px 30px rgba(86,99,255,0.12)'
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem'
      }
    }
  },
  plugins: []
};

export default config;
