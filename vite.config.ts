import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import type { UserConfig } from 'vite'
import type { InlineConfig } from 'vitest'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
  },
} as UserConfig & { test: InlineConfig })
