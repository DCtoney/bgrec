import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
    let isProduction = command === "build";
    return {
        build: {
            chunkSizeWarningLimit: Infinity,
            outDir: "public",
            rollupOptions: {
                input: {
                    search: "src/html/search.html",
                    about: "src/html/about.html",
                    game: "src/html/game.html",
                    results: "src/html/search-results.html",
                    login: "src/html/profile-login.html"
                }
            }
        }
    };
});
