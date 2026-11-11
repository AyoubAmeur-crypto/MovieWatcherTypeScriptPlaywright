import { defineConfig } from 'vitest/config'

// Unit tests + benchmarks live in src/ (*.test.ts / *.bench.ts).
// Playwright E2E specs in tests/ are excluded so Vitest doesn't try to run them.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    benchmark: {
      include: ['src/**/*.bench.ts'],
    },
  },
})

