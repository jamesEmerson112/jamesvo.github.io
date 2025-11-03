import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [svelte()],
  // Root path for GitHub Pages user site
  base: '/',
  build: {
    outDir: 'dist'
  }
}))
