import { Button, Flex, Logo } from '@eleven-labs/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Link, useNavigate } from 'react-router-dom';

import { PATHS } from '@/constants';
import { getValidLanguage } from '@/helpers/langHelper';
import { useCurrentPath } from '@/hooks/useCurrentPath';

export type LayoutTemplateProps = {
  children: React.ReactNode;
};

export const LayoutTemplate: React.FC<LayoutTemplateProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentPath = useCurrentPath();
  const languageForChange = i18n.language === 'fr' ? 'en' : 'fr';

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="full" gap="m">
      <Logo name="website" color="navy" size="5rem" />
      <Flex gap="xs">
        <Button as={Link} to={generatePath(PATHS.HOME, { lang: getValidLanguage(i18n.language) })}>
          {t('layout.menu.home')}
        </Button>
        <Button as={Link} to={generatePath(PATHS.POKEMON_LIST, { lang: getValidLanguage(i18n.language) })}>
          {t('layout.menu.pokemon-list')}
        </Button>
      </Flex>
      <Button
        variant="secondary"
        onClick={(): void => {
          i18n.changeLanguage(languageForChange);
          navigate(generatePath(currentPath, { lang: languageForChange }));
        }}
      >
        {t('layout.change-lang', { lang: languageForChange })}
      </Button>
      {children}
    </Flex>
  );
};
