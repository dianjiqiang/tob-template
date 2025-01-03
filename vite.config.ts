import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
        components: path.resolve(__dirname, 'src/components'),
        api: path.resolve(__dirname, 'src/api'),
        utils: path.resolve(__dirname, 'src/utils'),
        router: path.resolve(__dirname, 'src/router'),
        store: path.resolve(__dirname, 'src/store'),
        assets: path.resolve(__dirname, 'src/assets'),
        context: path.resolve(__dirname, 'src/context'),
    }
  }
})
