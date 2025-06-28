import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/',  // Since this is for username.github.io, it will be at the root
  build: {
    outDir: 'dist'
  }
})
