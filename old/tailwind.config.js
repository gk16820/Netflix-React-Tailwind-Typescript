/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            // Semantic colors like
            colors: {
                netflix: {
                    red: '#E50914',
                    dark: '#141414',
                    light: '#e5e5e5',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-to-b': 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0) 90%)',
            }
        },
    },
    plugins: [],
}
