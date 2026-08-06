import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    400: "#818CF8",
                    500: "#6366F1",
                    600: "#4F46E5",
                },
                accent: {
                    400: "#2DD4BF",
                    500: "#14B8A6",
                },
                surface: {
                    dark: "#0F172A",
                    card: "#1E293B",
                },
            },
            backgroundImage: {
                "gradient-primary":
                    "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                "gradient-progress":
                    "linear-gradient(90deg, #14B8A6 0%, #22D3EE 100%)",
            },
        },
    },

    plugins: [forms],
};
