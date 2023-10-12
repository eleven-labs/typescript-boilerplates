import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { usePokemonsQuery } from '@/graphql';
import type { PokemonListPageProps } from '@/pages';
import { PokemonListPage } from '@/pages';

export const PokemonListPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const pokemonsResult = usePokemonsQuery();
  const pokemons: PokemonListPageProps['pokemons'] = pokemonsResult.data?.pokemons?.results?.map((pokemon) => ({
    name: pokemon.name as string,
  }));

  return (
    <PokemonListPage isLoading={pokemonsResult.isLoading} pokemons={pokemons} title={t('pages.pokemon-list.title')} />
  );
};
