import { createServer as createViteServer } from 'vite';

const dev = async () => {
    const vite = await createViteServer({
        appType: 'custom',
    });
    await vite.ssrLoadModule('/src/server.ts');
}

dev();
