import { Box, Flex, Heading, Text } from '@eleven-labs/design-system';
import * as React from 'react';

export interface PokemonListPageProps {
  pokemons: Array<{ name: string }>;
  title: string;
}

export const PokemonListPage: React.FC<PokemonListPageProps> = ({ pokemons }) => (
  <>
    <Heading>{<title />}</Heading>
    <Flex alignItems="center" gap="xs" justifyContent="center">
      {pokemons.map((pokemon, index) => (
        <Box key={index} textAlign="center">
          <img
            alt={pokemon.name}
            src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
            style={{ height: '15rem' }}
          />
          <Text size="m">{pokemon.name}</Text>
        </Box>
      ))}
    </Flex>
  </>
);
