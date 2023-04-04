import express from 'express';
import i18next from 'i18next';
import i18nextHttpMiddleware from 'i18next-http-middleware';

import { i18nConfig } from '@/config/i18n';
import { IS_PROD } from '@/constants';
import { createRequestByExpressRequest } from '@/helpers/requestHelper';
import { getInlineVariablesForI18n } from '@/helpers/ssrHelper';

const createServer = async (): Promise<void> => {
  const app = express();

  if (IS_PROD) {
    const { dirname, resolve } = await import('node:path');
    const { fileURLToPath } = await import('node:url');
    const { getLinksAndScripts } = await import('./helpers/ssrHelper');
    const { default: serveStatic } = await import('serve-static');

    const currentDirname = dirname(fileURLToPath(import.meta.url));
    const { links, scripts } = getLinksAndScripts(currentDirname);

    app.use(serveStatic(resolve(currentDirname, 'public'), { index: false }));
    // eslint-disable-next-line import/no-named-as-default-member
    i18next.use(i18nextHttpMiddleware.LanguageDetector).init(i18nConfig);
    app.use(i18nextHttpMiddleware.handle(i18next));

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.use('*', async (req, res, next) => {
      try {
        const { render } = await import('./entry-server.js');
        const request = createRequestByExpressRequest(req);
        const html = await render({
          request,
          i18n: req.i18n,
          links,
          scripts: [
            {
              text: getInlineVariablesForI18n(req.i18n),
            },
            ...scripts,
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
      server: { middlewareMode: true, cors: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);
    // eslint-disable-next-line import/no-named-as-default-member
    i18next.use(i18nextHttpMiddleware.LanguageDetector).init(i18nConfig);
    app.use(i18nextHttpMiddleware.handle(i18next));

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      try {
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
        const request = createRequestByExpressRequest(req);
        const html = await render({
          request,
          i18n: req.i18n,
          scripts: [
            {
              text: getInlineVariablesForI18n(req.i18n),
            },
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

  const PORT = process.env.PORT ?? 5173;
  app.listen(PORT, () => {
    console.log(`Your site is now being served at: http://localhost:${PORT}`);
  });
};

createServer();
