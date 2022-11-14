import { useHead } from 'hoofd';
import { i18n } from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { useRoutes } from 'react-router-dom';

import { routes } from '@/config/router';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const RootContainer: React.FC<{ i18n: i18n }> = ({ i18n }) => {
  const router = useRoutes(routes);
  useHead({
    language: i18n.language,
    title: 'Welcome to hoofd | 💭',
  });
  return <I18nextProvider i18n={i18n}>{router ? router : <NotFoundPage />}</I18nextProvider>;
};
