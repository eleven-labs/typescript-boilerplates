import '@eleven-labs/design-system/style.css';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { i18nConfig } from '@/config/i18n/i18n.config';
import { RootContainer } from '@/containers/RootContainer';

const container = document.getElementById('root');
const i18n = i18next.createInstance().use(LanguageDetector).use(initReactI18next);

if (container) {
  i18n.init(i18nConfig);
  ReactDOM.hydrateRoot(
    container,
    <BrowserRouter>
      <RootContainer i18n={i18n} />
    </BrowserRouter>
  );
}
