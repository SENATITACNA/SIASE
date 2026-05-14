import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BACKEND = 'http://80.241.217.53:3000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: true,
    proxy: {
      '/login': {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    port: 4000,
    host: true,
    proxy: {
      '/login': {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
