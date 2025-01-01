import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#333',
            a: {
              textDecoration: 'none',
              borderBottom: 'none',
              '&:hover': {
                textDecoration: 'none',
                borderBottom: 'none',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: '#fff',
            a: {
              color: '#9CA3AF',
              textDecoration: 'none',
              borderBottom: 'none',
              '&:hover': {
                color: '#F3F4F6',
                textDecoration: 'none',
                borderBottom: 'none',
              },
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            h4: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            code: {
              color: '#fff',
            },
            blockquote: {
              color: '#fff',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
