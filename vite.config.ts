/// <reference types="vitest" />
import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules'),
    }
  },
  test: {
    globals: true,
    environment: "jsdom"
  },
  plugins: [vue()]
})
