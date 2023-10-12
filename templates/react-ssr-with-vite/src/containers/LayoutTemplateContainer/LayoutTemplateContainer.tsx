import { Button, Flex, Logo } from '@eleven-labs/design-system';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { LanguageEnum, PATHS } from '@/constants';
import { getValidLanguage } from '@/helpers/langHelper';
import { useCurrentPath } from '@/hooks/useCurrentPath';

export interface LayoutTemplateContainerProps {
  children: React.ReactNode;
}

export const LayoutTemplateContainer: React.FC<LayoutTemplateContainerProps> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const currentPath = useCurrentPath();
  const languageForChange = i18n.language === LanguageEnum.FR ? LanguageEnum.EN : LanguageEnum.FR;

  return (
    <Flex alignItems="center" flexDirection="column" gap="m" height="full" justifyContent="center">
      <Logo color="navy" name="website" size="5rem" />
      <Flex gap="xs">
        <Button
          to={generatePath(PATHS.HOME, {
            lang: getValidLanguage(i18n.language),
          })}
          as={Link}
        >
          {t('layout.menu.home')}
        </Button>
        <Button
          to={generatePath(PATHS.POKEMON_LIST, {
            lang: getValidLanguage(i18n.language),
          })}
          as={Link}
        >
          {t('layout.menu.pokemon-list')}
        </Button>
      </Flex>
      <Button
        to={generatePath(!currentPath || currentPath === PATHS.ROOT ? PATHS.HOME : currentPath, {
          lang: languageForChange,
        })}
        as={Link}
        variant="secondary"
      >
        {t('layout.change-lang', { lang: languageForChange })}
      </Button>
      {children}
    </Flex>
  );
};
