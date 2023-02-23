import { createServer as createViteServer } from 'vite';

const dev = async (): Promise<void> => {
  const vite = await createViteServer({
    appType: 'custom',
  });
  await vite.ssrLoadModule('/src/server.ts');
};

dev();
