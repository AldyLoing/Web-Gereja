import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

const config: Config = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Poppins', 'Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'church-green': {
                    light: '#00B857',
                    DEFAULT: '#009345',
                    dark: '#007A36',
                },
                'church-brown': '#D69A7A',
                'church-gold': {
                    light: '#F2C84B',
                    DEFAULT: '#B88A2F',
                    dark: '#B88A2F',
                },
            },
        },
    },
    plugins: [forms, typography],
}

export default config
