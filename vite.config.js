import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Mirrors the vercel.json rewrite: the calling agent backend sends no CORS headers
    proxy: {
      '/api/agent/outbound': {
        target: 'https://goran-calling-agent.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/agent/, '/api'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
