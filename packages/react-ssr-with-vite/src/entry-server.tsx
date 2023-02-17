import { createDispatcher, HoofdProvider } from 'hoofd';
import { i18n } from 'i18next';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { RootContainer } from '@/containers/RootContainer';
import { HtmlTemplate, HtmlTemplateProps } from '@/templates/HtmlTemplate';

export const render = (options: { url: string; i18n: i18n } & Pick<HtmlTemplateProps, 'links' | 'scripts'>): string => {
  const dispatcher = createDispatcher();

  const content = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HoofdProvider value={dispatcher}>
        <StaticRouter location={options.url}>
          <RootContainer i18n={options.i18n} />
        </StaticRouter>
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
