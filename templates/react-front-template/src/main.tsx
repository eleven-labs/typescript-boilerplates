import '@eleven-labs/design-system/style.css';
import { createInstance as createInstanceI18next } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';

import { i18nConfig } from '@/config/i18n/i18n.config';
import { RootContainer } from '@/containers/RootContainer';

const container = document.querySelector('#root');
const i18n = createInstanceI18next().use(LanguageDetector).use(HttpApi).use(initReactI18next);

if (container) {
  i18n.init(i18nConfig);
  hydrateRoot(container, <RootContainer i18n={i18n} />);
}
