/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                midnight: {
                    800: '#2d1b4e', // Lighter purple for cards
                    900: '#1a0b2e', // Deep purple
                    950: '#0a0118', // Almost black background
                },
                aurora: {
                    peach: '#f8c291',
                    pink: '#e55039',
                    magenta: '#8e44ad',
                    violet: '#3c6382',
                    teal: '#0a3d62'
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'aurora-mesh': 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
            }
        },
    },
    plugins: [],
}
