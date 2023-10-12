import { createServer as createViteServer } from 'vite';

const prerender = async (): Promise<void> => {
  const vite = await createViteServer({
    appType: 'custom',
    server: { middlewareMode: true },
  });

  try {
    const { generateHtmlFiles } = await vite.ssrLoadModule('/src/helpers/prerenderHelper.ts');
    generateHtmlFiles(process.cwd());
  } catch (error) {
    console.error(error);
  } finally {
    vite.close();
  }
};

prerender();
