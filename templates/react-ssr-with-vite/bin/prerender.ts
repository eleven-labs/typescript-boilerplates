import { createServer as createViteServer } from 'vite';

const prerender = async (): Promise<void> => {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { generateHtmlFiles } = await vite.ssrLoadModule('/src/helpers/prerenderHelper.ts');
    generateHtmlFiles(process.cwd());
  } catch (e) {
    console.error(e);
  } finally {
    vite.close();
  }
};

prerender();
