import { build as buildVite } from 'vite';

const build = async (): Promise<void> => {
  // 1. Build Server
  buildVite({
    build: {
      emptyOutDir: false,
      ssr: true,
      outDir: 'dist',
      rollupOptions: {
        input: 'src/server.ts',
      },
    },
  });

  // 2. Build Client
  buildVite({
    build: {
      emptyOutDir: false,
      manifest: true,
      outDir: 'dist/public',
    },
  });
};

build();
