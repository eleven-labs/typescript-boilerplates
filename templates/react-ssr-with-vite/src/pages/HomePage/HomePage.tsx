import { Box, Flex, Heading, Text } from '@eleven-labs/design-system';
import * as React from 'react';

import './HomePage.scss';

export interface HomePageProps {
  buttonContainer: React.ReactNode;
  description: string;
  title: string;
}

export const HomePage: React.FC<HomePageProps> = ({ buttonContainer, description, title }) => (
  <>
    <Heading size="xl">{title}</Heading>
    <Flex alignItems="center" justifyContent="center" mt="m">
      <Box as="a" href="https://vitejs.dev" rel="noreferrer" target="_blank">
        <img alt="Vite logo" className="logo-vite" src="/vite.svg" />
      </Box>
      <Box as="a" href="https://reactjs.org" rel="noreferrer" target="_blank">
        <img alt="React logo" className="logo-react" src="/react.svg" />
      </Box>
    </Flex>
    <Text color="dark-grey" dangerouslySetInnerHTML={{ __html: description }} />
    <Box partial-hydrate="button-container" suppressHydrationWarning>
      {buttonContainer}
    </Box>
  </>
);
