/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./test/setup.ts'],
    include: ['./app/tests/**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', 'build/**'],
  },
});
