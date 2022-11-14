import express from 'express';
import i18next from 'i18next';
import i18nextHttpMiddleware from 'i18next-http-middleware';

import { i18nConfig } from '@/config/i18n';

const isProd = process.env.NODE_ENV === 'production';

const createServer = async (): Promise<void> => {
  i18next.use(i18nextHttpMiddleware.LanguageDetector).init(i18nConfig);

  const app = express();
  app.use(i18nextHttpMiddleware.handle(i18next));

  if (isProd) {
    const { dirname, resolve } = await import('node:path');
    const { fileURLToPath } = await import('node:url');
    const { readFileSync } = await import('node:fs');
    const { default: serveStatic } = await import('serve-static');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const manifest = JSON.parse(readFileSync(resolve(__dirname, 'public/manifest.json'), { encoding: 'utf-8' }));
    const manifestEntryClient = manifest['src/entry-client.tsx'];

    app.use(serveStatic(resolve(__dirname, 'public'), { index: false }));

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      try {
        const { render } = await import('./entry-server.js');
        const html = await render({
          url,
          i18n: req.i18n,
          links: manifestEntryClient['css']?.map((file: string) => ({
            rel: 'stylesheet',
            href: `/${file}`,
          })),
          scripts: [
            {
              type: 'module',
              src: `/${manifestEntryClient['file']}`,
            },
          ],
        });
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      try {
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
        const html = await render({
          url,
          i18n: req.i18n,
          scripts: [
            {
              type: 'module',
              src: '/src/entry-client.tsx',
            },
          ],
        });
        const htmlWithViteHMRClient = await vite.transformIndexHtml(url, html);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithViteHMRClient);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  const PORT = process.env.PORT || 5173;
  app.listen(PORT, () => {
    console.log(`Your site is now being served at: http://localhost:${PORT}`);
  });
};

createServer();
