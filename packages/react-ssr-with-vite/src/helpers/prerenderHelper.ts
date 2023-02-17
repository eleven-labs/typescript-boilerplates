import i18next, { i18n } from 'i18next';
import { generatePath } from 'react-router-dom';

import { i18nConfig } from '@/config/i18n';
import { AUTHORIZED_LANGUAGES, DEFAULT_LANGUAGE, PATHS } from '@/constants';

export const getI18nInstanceByLang = (lang: string): i18n => {
  const i18n = i18next.createInstance();
  i18n.init(i18nConfig);
  i18n.changeLanguage(lang);
  return i18n;
};

export const getUrlsByLang = (): { lang: string; url: string }[] => {
  const urlsByLang = AUTHORIZED_LANGUAGES.reduce<ReturnType<typeof getUrlsByLang>>((currentUrls, lang) => {
    currentUrls.push({
      lang,
      url: generatePath(PATHS.HOME, { lang }),
    });
    currentUrls.push({
      lang,
      url: generatePath(PATHS.OTHER_PAGE, { lang }),
    });
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
