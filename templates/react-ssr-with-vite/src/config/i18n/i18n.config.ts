import { type InitOptions } from 'i18next';

import { AUTHORIZED_LANGUAGES, DEFAULT_LANGUAGE } from '@/constants';
import translationsEn from '@/translations/messages.en.json';
import translationsFr from '@/translations/messages.fr.json';

export const i18nConfig: InitOptions = {
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
  resources: {
    en: { messages: translationsEn },
    fr: { messages: translationsFr },
  },
  returnEmptyString: false,
};
