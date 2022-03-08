import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^@\/(.+)/,
        replacement: `${resolve(__dirname, 'src')}/$1`,
      },
      {
        find: /^#\/(.+)/,
        replacement: `${resolve(__dirname, 'types')}/$1`,
      },
    ],
  },
})
