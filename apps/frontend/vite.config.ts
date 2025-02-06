import { vitePlugin as remix } from '@remix-run/dev';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Add type declaration for future flags
declare module '@remix-run/node' {
  interface Future {
    v3_fetcherPersist: true;
    v3_lazyRouteDiscovery: true;
    v3_relativeSplatPath: true;
    v3_singleFetch: true;
    v3_throwAbortReason: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true,
      },
    }),
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': '/app',
      // Polyfills pour les modules Node
      'node:crypto': 'crypto-browserify',
      'node:buffer': 'buffer',
      'node:zlib': 'browserify-zlib',
      'node:assert': 'assert',
    },
  },
  optimizeDeps: {
    exclude: ['vitest'],
    include: ['buffer', 'crypto-browserify', 'browserify-zlib', 'assert'],
  },
  build: {
    rollupOptions: {
      external: ['vitest'],
    },
  },
});
