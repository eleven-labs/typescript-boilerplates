import './HomePage.scss';

import { Box, Button, Flex, Heading, Text } from '@eleven-labs/design-system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import { PATHS } from '@/constants';

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const languageForChange = i18n.language === 'fr' ? 'en' : 'fr';
  const [number, increment] = useState<number>(0);

  return (
    <>
      <Button
        variant="secondary"
        onClick={(): void => {
          i18n.changeLanguage(languageForChange);
          navigate(generatePath(PATHS.HOME, { lang: languageForChange }));
        }}
      >
        {t('layout.change-lang', { lang: languageForChange })}
      </Button>
      <Heading size="xl">{t('pages.home.title')}</Heading>
      <Flex mt="m" alignItems="center" justifyContent="center">
        <Box as="a" href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </Box>
        <Box as="a" href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </Box>
      </Flex>
      <Text color="dark-grey" dangerouslySetInnerHTML={{ __html: t('pages.home.description') }} />
      <Button onClick={(): void => increment((n) => n + 1)}>Increment {number}</Button>
    </>
  );
};
