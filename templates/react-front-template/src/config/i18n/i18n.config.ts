import { type InitOptions } from 'i18next';

import { AUTHORIZED_LANGUAGES, DEFAULT_LANGUAGE, TRANSLATIONS_ENDPOINT_URI } from '@/constants';

export const i18nConfig: InitOptions = {
  backend: {
    crossDomain: true,
    loadPath: `${TRANSLATIONS_ENDPOINT_URI}/{{ns}}.{{lng}}.json`,
  },
  defaultNS: 'messages',
  detection: {
    lookupFromPathIndex: 0,
    order: ['path'],
  },
  fallbackLng: DEFAULT_LANGUAGE,
  load: 'languageOnly',
  ns: 'messages',
  preload: AUTHORIZED_LANGUAGES,
  react: {
    bindI18n: 'languageChanged',
    bindI18nStore: false,
    useSuspense: false,
  },
  returnEmptyString: false,
};
