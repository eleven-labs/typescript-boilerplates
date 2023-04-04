import { Box, Flex, Heading, Text } from '@eleven-labs/design-system';
import * as React from 'react';

export interface PokemonListPageProps {
  title: string;
  pokemons: Array<{ name: string }>;
}

export const PokemonListPage: React.FC<PokemonListPageProps> = ({ pokemons }) => (
  <>
    <Heading>{<title />}</Heading>
    <Flex gap="xs" justifyContent="center" alignItems="center">
      {pokemons.map((pokemon, index) => (
        <Box key={index} textAlign="center">
          <img
            src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
            alt={pokemon.name}
            style={{ height: '15rem' }}
          />
          <Text size="m">{pokemon.name}</Text>
        </Box>
      ))}
    </Flex>
  </>
);
