import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte({
        compilerOptions: {
            customElement: true,
        }
    })],
    build: {
        rollupOptions: {
            // Configure the output to be a single, immediately-invoked function expression (IIFE)
            output: {
                format: "iife",
                entryFileNames: "petagpt.js", // The name of the output file
                manualChunks: undefined,
            },
        },
    },
})
