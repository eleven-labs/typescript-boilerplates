import { createStaticHandler } from '@remix-run/router';
import { Request, Response } from 'cross-fetch';
import { createDispatcher, HoofdProvider } from 'hoofd';
import { i18n } from 'i18next';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';

import { routes } from '@/config/router';
import { RootContainer } from '@/containers/RootContainer';
import { HtmlTemplate, HtmlTemplateProps } from '@/templates/HtmlTemplate';

export const render = async (
  options: { request: Request; i18n: i18n } & Pick<HtmlTemplateProps, 'links' | 'scripts'>
): Promise<string> => {
  const dispatcher = createDispatcher();
  const { query } = createStaticHandler(routes);
  const context = await query(options.request);

  if (context instanceof Response) {
    throw context;
  }
  const router = createStaticRouter(routes, context);

  const content = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HoofdProvider value={dispatcher}>
        <RootContainer i18n={options.i18n}>
          <StaticRouterProvider router={router} context={context} nonce="the-nonce" />
        </RootContainer>
      </HoofdProvider>
    </React.StrictMode>
  );

  const staticPayload = dispatcher.toStatic();
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <HtmlTemplate staticPayload={staticPayload} content={content} scripts={options.scripts} links={options.links} />
    </React.StrictMode>
  );
};
