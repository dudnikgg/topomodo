/// <reference types="vitest" />
import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  test: {
    globals: true,
    environment: "jsdom"
  },
  plugins: [vue()]
})
