import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import markdownPlugin from './plugins/markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), markdownPlugin()],
  build: {
    rollupOptions: {
      input: './src/entry-client.tsx',
    }
  },
});
