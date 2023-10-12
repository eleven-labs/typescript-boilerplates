import type i18nextHttpMiddleware from 'i18next-http-middleware';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { type HtmlTemplateProps } from '@/templates/HtmlTemplate';
export const getInlineVariablesForI18n = (i18n: i18nextHttpMiddleware.I18next): string =>
  [`window.initialLanguage="${i18n.language}"`, `window.initialI18nStore=${JSON.stringify(i18n.store.data)}`].join(';');

export const getLinksAndScripts = (
  dirname: string
): {
  links: Exclude<HtmlTemplateProps['links'], undefined>;
  scripts: Exclude<HtmlTemplateProps['scripts'], undefined>;
} => {
  const manifest = JSON.parse(
    readFileSync(resolve(dirname, 'public/manifest.json'), {
      encoding: 'utf8',
    })
  );
  const manifestEntryClient: { css: string[]; file: string } = manifest['src/entry-client.tsx'];

  return {
    links:
      manifestEntryClient.css?.map((file: string) => ({
        href: `/${file}`,
        rel: 'stylesheet',
      })) ?? [],
    scripts: [
      {
        src: `/${manifestEntryClient.file}`,
        type: 'module',
      },
    ],
  };
};
