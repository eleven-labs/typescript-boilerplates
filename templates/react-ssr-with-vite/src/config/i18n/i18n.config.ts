import { type InitOptions } from 'i18next';

import { AUTHORIZED_LANGUAGES, DEFAULT_LANGUAGE } from '@/constants';
import translationsEn from '@/translations/messages.en.json';
import translationsFr from '@/translations/messages.fr.json';

export const i18nConfig: InitOptions = {
  load: 'languageOnly',
  preload: AUTHORIZED_LANGUAGES,
  fallbackLng: DEFAULT_LANGUAGE,
  resources: {
    fr: { messages: translationsFr },
    en: { messages: translationsEn },
  },
  returnEmptyString: false,
  defaultNS: 'messages',
  ns: 'messages',
  react: {
    bindI18n: 'languageChanged',
    bindI18nStore: false,
    useSuspense: false,
  },
  detection: {
    order: ['path'],
    lookupFromPathIndex: 0,
  },
};
