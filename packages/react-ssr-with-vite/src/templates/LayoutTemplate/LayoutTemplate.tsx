import { Button, Flex, Logo } from '@eleven-labs/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';

import { PATHS } from '@/constants';
import { getValidLanguage } from '@/helpers/langHelper';

export type LayoutTemplateProps = {
  children: React.ReactNode;
};

export const LayoutTemplate: React.FC<LayoutTemplateProps> = ({ children }) => {
  const { t, i18n } = useTranslation();

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="full" gap="m">
      <Logo name="website" color="navy" size="5rem" />
      <Flex gap="xs">
        <Button as={Link} to={generatePath(PATHS.HOME, { lang: getValidLanguage(i18n.language) })}>
          {t('layout.menu.home')}
        </Button>
        <Button as={Link} to={generatePath(PATHS.OTHER_PAGE, { lang: getValidLanguage(i18n.language) })}>
          {t('layout.menu.other-page')}
        </Button>
      </Flex>
      {children}
    </Flex>
  );
};
