import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://ecom-lgfu.onrender.com',
        changeOrigin: true,
        secure: true,  // Use this if your backend server uses HTTPS
      },
    },
  },
  plugins: [react()],
})
