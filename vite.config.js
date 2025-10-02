import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [svelte()],
  // Use root path in dev, repo name in production
  base: command === 'serve' ? '/' : '/jamesvo.github.io/',
  build: {
    outDir: 'dist'
  }
}))
