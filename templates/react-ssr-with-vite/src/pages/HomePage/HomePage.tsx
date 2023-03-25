import './HomePage.scss';

import { Box, Flex, Heading, Text } from '@eleven-labs/design-system';
import * as React from 'react';

export interface HomePageProps {
  title: string;
  description: string;
  buttonContainer: React.ReactNode;
}

export const HomePage: React.FC<HomePageProps> = ({ title, description, buttonContainer }) => (
  <>
    <Heading size="xl">{title}</Heading>
    <Flex mt="m" alignItems="center" justifyContent="center">
      <Box as="a" href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img src="/vite.svg" className="logo-vite" alt="Vite logo" />
      </Box>
      <Box as="a" href="https://reactjs.org" target="_blank" rel="noreferrer">
        <img src="/react.svg" className="logo-react" alt="React logo" />
      </Box>
    </Flex>
    <Text color="dark-grey" dangerouslySetInnerHTML={{ __html: description }} />
    <Box partial-hydrate="button-container" suppressHydrationWarning>
      {buttonContainer}
    </Box>
  </>
);
