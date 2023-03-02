import { Box, Flex, Heading, Text } from '@eleven-labs/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';

export const PokemonListPage: React.FC = () => {
  const { t } = useTranslation();
  const { pokemons }: { pokemons: { name: string }[] } = useLoaderData();

  return (
    <>
      <Heading>{t('pages.pokemon-list.title')}</Heading>
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
};
