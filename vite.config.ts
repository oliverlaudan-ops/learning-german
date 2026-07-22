/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  test: {
    // happy-dom is lighter than jsdom (no full DOM polyfill, faster startup,
    // smaller install footprint). We only need a minimal browser-like env for
    // localStorage + speech stubs in tests, and happy-dom covers both well.
    environment: 'happy-dom',
    globals: false,
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})
