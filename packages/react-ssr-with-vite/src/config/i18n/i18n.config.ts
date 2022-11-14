import { InitOptions } from 'i18next';

import translationsEn from '@/translations/en.translations.json';
import frTranslations from '@/translations/fr.translations.json';

import { AUTHORIZED_LANGUAGES, DEFAULT_LANGUAGE } from '../../constants';

export const i18nConfig = {
  load: 'languageOnly',
  preload: AUTHORIZED_LANGUAGES,
  whitelist: AUTHORIZED_LANGUAGES,
  fallbackLng: DEFAULT_LANGUAGE,
  resources: {
    fr: { messages: frTranslations },
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
} as InitOptions;
