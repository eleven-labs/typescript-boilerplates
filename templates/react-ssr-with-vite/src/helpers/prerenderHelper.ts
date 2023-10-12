import { createInstance as createInstanceI18Next, type i18n } from 'i18next';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { generatePath } from 'react-router-dom';

import { i18nConfig } from '@/config/i18n';
import { AUTHORIZED_LANGUAGES, DEFAULT_LANGUAGE, PATHS } from '@/constants';
import { render } from '@/entry-server';
import { createRequestByUrl } from '@/helpers/requestHelper';
import { getLinksAndScripts } from '@/helpers/ssrHelper';

const getI18nInstanceByLang = (lang: string): i18n => {
  const i18n = createInstanceI18Next();
  i18n.init(i18nConfig);
  i18n.changeLanguage(lang);
  return i18n;
};

const getUrlsByLang = (): Array<{ lang: string; url: string }> => {
  const urlsByLang = AUTHORIZED_LANGUAGES.reduce<ReturnType<typeof getUrlsByLang>>((currentUrls, lang) => {
    currentUrls.push(
      {
        lang,
        url: generatePath(PATHS.HOME, { lang }),
      },
      {
        lang,
        url: generatePath(PATHS.POKEMON_LIST, { lang }),
      }
    );
    return currentUrls;
  }, []);

  return [
    {
      lang: DEFAULT_LANGUAGE,
      url: PATHS.ROOT,
    },
    ...urlsByLang,
  ];
};

export const generateHtmlFiles = async (rootDirectory: string): Promise<void> => {
  const urlsByLang = getUrlsByLang();
  const { links, scripts } = getLinksAndScripts(resolve(rootDirectory, 'dist'));

  for (const { lang, url } of urlsByLang) {
    const i18n = getI18nInstanceByLang(lang);

    const html = await render({
      i18n,
      links,
      request: createRequestByUrl({ url }),
      scripts,
    });

    const filePath = resolve(rootDirectory, 'dist/public', `${url.length > 1 ? `${url.slice(1)}/` : ''}index.html`);

    const directoryPath = dirname(filePath);
    if (!existsSync(directoryPath)) {
      mkdirSync(directoryPath, { recursive: true });
    }
    writeFileSync(filePath, html, 'utf8');
  }

  console.log('🦖🖨 Your static site is ready to deploy from dist');
};
