import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { NotFoundPage } from '@/pages';

export const NotFoundPageContainer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <NotFoundPage
      description={t('pages.not-found.description')}
      subDescription={t('pages.not-found.sub-description')}
      title={t('pages.not-found.title')}
    />
  );
};
