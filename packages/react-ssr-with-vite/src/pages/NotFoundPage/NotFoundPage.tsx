import { Heading, Text } from '@eleven-labs/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading>{t('pages.not-found.title')}</Heading>
      <Text>{t('pages.not-found.description')}</Text>
      <Text>{t('pages.not-found.subdescription')}</Text>
    </>
  );
};
