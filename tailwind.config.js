/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-blue': '#224191',
                'primary-dark': '#202020',
                'background-light': '#f8f9fc',
            },
            fontFamily: {
                'sans': ['Afacad', 'sans-serif'],
                'anta': ['Anta', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
