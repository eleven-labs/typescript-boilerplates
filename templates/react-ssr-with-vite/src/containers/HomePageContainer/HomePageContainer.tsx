import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonContainer } from '@/containers/ButtonContainer';
import { HomePage } from '@/pages';

export const HomePageContainer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <HomePage
      title={t('pages.home.title')}
      description={t('pages.home.description')}
      buttonContainer={<ButtonContainer />}
    />
  );
};
