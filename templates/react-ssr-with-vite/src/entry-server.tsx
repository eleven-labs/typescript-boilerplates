import { createStaticHandler } from '@remix-run/router';
import { type Request, Response } from 'cross-fetch';
import { createDispatcher, HoofdProvider } from 'hoofd';
import { type i18n } from 'i18next';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';

import { routes } from '@/config/router';
import { RootContainer } from '@/containers/RootContainer';
import { HtmlTemplate, type HtmlTemplateProps } from '@/templates/HtmlTemplate';

export const render = async (
  options: { request: Request; i18n: i18n } & Pick<HtmlTemplateProps, 'links' | 'styles' | 'scripts'>
): Promise<string> => {
  const dispatcher = createDispatcher();
  const { query } = createStaticHandler(routes);
  const context = await query(options.request);

  if (context instanceof Response) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw context;
  }

  const router = createStaticRouter(routes, context);

  const content = renderToString(
    <React.StrictMode>
      <HoofdProvider value={dispatcher}>
        <RootContainer i18n={options.i18n}>
          <StaticRouterProvider router={router} context={context} nonce="the-nonce" />
        </RootContainer>
      </HoofdProvider>
    </React.StrictMode>
  );

  const staticPayload = dispatcher.toStatic();
  return renderToString(
    <React.StrictMode>
      <HtmlTemplate
        lang={staticPayload.lang ?? options.i18n.language}
        title={staticPayload.title ?? ''}
        content={content}
        metas={staticPayload.metas?.map(({ charset: charSet, ...meta }) => ({ charSet, ...meta }))}
        styles={options.styles}
        scripts={[
          ...(options.scripts ?? []),
          ...(staticPayload.scripts?.map(({ crossorigin: crossOrigin, ...script }) => ({ crossOrigin, ...script })) ??
            []),
        ]}
        links={[
          ...(options.links ?? []),
          ...(staticPayload.links?.map(({ crossorigin: crossOrigin, hreflang: hrefLang, ...link }) => ({
            crossOrigin,
            hrefLang,
            ...link,
          })) ?? []),
        ]}
      />
    </React.StrictMode>
  );
};
