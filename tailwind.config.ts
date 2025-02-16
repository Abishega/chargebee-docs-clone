import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mature_blue: '#0e4659',
        'forest-green': '#228B22',
        'spunky-lime': '#bff90b',
        verBlue: '#0e4659',
        grayShade: '#EFEFEF',
      },
      transitionDuration: {
        '800': '800ms', // 0.8 seconds
      },
      spacing: {
        '20rem': '20rem',
        '12rem': '12rem',
        '11rem': '11rem',
        '15rem': '15rem',
      },
      fontSize: {
        custom: '22px',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
