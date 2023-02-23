import './HomePage.scss';

import { Box, Button, Flex, Heading, Text } from '@eleven-labs/design-system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const [number, increment] = useState<number>(0);

  return (
    <>
      <Heading size="xl">{t('pages.home.title')}</Heading>
      <Flex mt="m" alignItems="center" justifyContent="center">
        <Box as="a" href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo-vite" alt="Vite logo" />
        </Box>
        <Box as="a" href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src="/react.svg" className="logo-react" alt="React logo" />
        </Box>
      </Flex>
      <Text color="dark-grey" dangerouslySetInnerHTML={{ __html: t('pages.home.description') }} />
      <Button onClick={(): void => increment((n) => n + 1)}>Increment {number}</Button>
    </>
  );
};
