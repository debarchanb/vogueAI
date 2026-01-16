import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/fashion': {
        target: 'https://api-fashion-ai.blacksky-cb6688f2.southindia.azurecontainerapps.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/fashion/, ''),
      }
    }
  }
})
