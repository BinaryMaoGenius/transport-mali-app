/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    green: '#009E49',
                    gold: '#FFD700',
                    red: '#CE1126',
                    dark: '#1a1a1a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
            }
        },
    },
    plugins: [],
}
