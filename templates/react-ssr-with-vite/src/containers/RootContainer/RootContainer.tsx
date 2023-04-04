import { useHead } from 'hoofd';
import { type i18n } from 'i18next';
import * as React from 'react';
import { I18nextProvider, useSSR } from 'react-i18next';
import { IS_SSR } from '@/constants';

export const RootContainer: React.FC<{ i18n: i18n; children: React.ReactNode }> = ({ i18n, children }) => {
  if (!IS_SSR) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSSR(window.initialI18nStore, window.initialLanguage);
  }
  useHead({
    language: i18n.language,
    title: 'Welcome to hoofd | 💭',
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
