import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { HomePage } from '@/pages';

export const HomePageContainer: React.FC = () => {
  const { t } = useTranslation();

  return <HomePage description={t('pages.home.description')} title={t('pages.home.title')} />;
};
