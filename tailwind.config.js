module.exports = {
    content: [
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                netflix: {
                    red: '#E50914',
                    dark: '#141414',
                    light: '#e5e5e5',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
