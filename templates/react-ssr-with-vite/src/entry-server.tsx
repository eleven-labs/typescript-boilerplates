import { createStaticHandler } from '@remix-run/router';
import { type Request, Response } from 'cross-fetch';
import { HoofdProvider, createDispatcher } from 'hoofd';
import { type i18n } from 'i18next';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouterProvider, createStaticRouter } from 'react-router-dom/server';

import { routes } from '@/config/router';
import { RootContainer } from '@/containers/RootContainer';
import { HtmlTemplate, type HtmlTemplateProps } from '@/templates/HtmlTemplate';

export const render = async (
  options: { i18n: i18n; request: Request } & Pick<HtmlTemplateProps, 'links' | 'scripts' | 'styles'>
): Promise<string> => {
  const dispatcher = createDispatcher();
  const { query } = createStaticHandler(routes);
  const context = await query(options.request);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(routes, context);

  const content = renderToString(
    <React.StrictMode>
      <HoofdProvider value={dispatcher}>
        <RootContainer i18n={options.i18n}>
          <StaticRouterProvider context={context} nonce="the-nonce" router={router} />
        </RootContainer>
      </HoofdProvider>
    </React.StrictMode>
  );

  const staticPayload = dispatcher.toStatic();
  return renderToString(
    <React.StrictMode>
      <HtmlTemplate
        links={[
          ...(options.links ?? []),
          ...(staticPayload.links?.map(({ crossorigin: crossOrigin, hreflang: hrefLang, ...link }) => ({
            crossOrigin,
            hrefLang,
            ...link,
          })) ?? []),
        ]}
        metas={staticPayload.metas?.map(({ charset: charSet, ...meta }) => ({
          charSet,
          ...meta,
        }))}
        scripts={[
          ...(options.scripts ?? []),
          ...(staticPayload.scripts?.map(({ crossorigin: crossOrigin, ...script }) => ({
            crossOrigin,
            ...script,
          })) ?? []),
        ]}
        content={content}
        lang={staticPayload.lang ?? options.i18n.language}
        styles={options.styles}
        title={staticPayload.title ?? ''}
      />
    </React.StrictMode>
  );
};
