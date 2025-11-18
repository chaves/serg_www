import { defineConfig } from "vitest/config";
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
    plugins: [enhancedImages(), sveltekit()],

    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },

    build: {
        minify: 'esbuild',
        cssMinify: true, // Use Vite's built-in CSS minification (compatible with Vercel)
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    // Ensure CSS files are properly named for Vercel serverless functions
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'assets/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    },

    css: {
        devSourcemap: false, // Disable sourcemaps in dev for better performance
    }
});
