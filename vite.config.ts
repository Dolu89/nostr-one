import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: 'nostr-one',
      fileName: (format) => `nostr-one.${format}.js`,
    },
  },
  plugins: [
    vue({ customElement: true }),
  ]
})
