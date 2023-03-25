import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { PokemonListPage } from '@/pages';

export const PokemonListPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const { pokemons } = useLoaderData() as { pokemons: Array<{ name: string }> };

  return <PokemonListPage title={t('pages.pokemon-list.title')} pokemons={pokemons} />;
};
