import { Heading, Text } from '@eleven-labs/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const OtherPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading>{t('pages.other-page.title')}</Heading>
      <Text>{t('pages.other-page.description')}</Text>
    </>
  );
};
