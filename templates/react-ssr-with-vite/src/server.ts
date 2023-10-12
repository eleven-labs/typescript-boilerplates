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
    i18next.use(i18nextHttpMiddleware.LanguageDetector).init(i18nConfig);
    app.use(i18nextHttpMiddleware.handle(i18next));

    app.use('*', async (expressRequest, response, next) => {
      try {
        const { render } = await import('./entry-server.js');
        const html = await render({
          i18n: expressRequest.i18n,
          links,
          request: createRequestByExpressRequest(expressRequest),
          scripts: [
            {
              text: getInlineVariablesForI18n(expressRequest.i18n),
            },
            ...scripts,
          ],
        });
        response.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (error) {
        next(error);
      }
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      appType: 'custom',
      server: { cors: true, middlewareMode: true },
    });

    app.use(vite.middlewares);
    i18next.use(i18nextHttpMiddleware.LanguageDetector).init(i18nConfig);
    app.use(i18nextHttpMiddleware.handle(i18next));

    app.use('*', async (expressRequest, response, next) => {
      const url = expressRequest.originalUrl;

      try {
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
        const html = await render({
          i18n: expressRequest.i18n,
          request: createRequestByExpressRequest(expressRequest),
          scripts: [
            {
              text: getInlineVariablesForI18n(expressRequest.i18n),
            },
            {
              src: '/src/entry-client.tsx',
              type: 'module',
            },
          ],
        });
        const htmlWithViteHMRClient = await vite.transformIndexHtml(url, html);
        response.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithViteHMRClient);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  }

  const PORT = process.env.PORT ?? 5173;
  app.listen(PORT, () => {
    console.log(`Your site is now being served at: http://localhost:${PORT}`);
  });
};

createServer();
