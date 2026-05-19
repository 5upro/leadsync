import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import talwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), talwindcss()],
	server: {
        port: 3000,
	},
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    }
});
