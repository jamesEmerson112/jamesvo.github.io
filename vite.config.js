import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/jamesvo.github.io/',  // Project repository needs the repo name in base path
  build: {
    outDir: 'dist'
  }
})
