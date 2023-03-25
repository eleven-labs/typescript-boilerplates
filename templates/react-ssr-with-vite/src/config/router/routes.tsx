import fetch from 'cross-fetch';
import * as React from 'react';
import { type RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { AUTHORIZED_LANGUAGES, PATHS } from '@/constants';
import {
  HomePageContainer,
  LayoutTemplateContainer,
  NotFoundPageContainer,
  PokemonListPageContainer,
} from '@/containers';

export const routes: RouteObject[] = [
  {
    element: (
      <LayoutTemplateContainer>
        <Outlet />
      </LayoutTemplateContainer>
    ),
    errorElement: (
      <LayoutTemplateContainer>
        <NotFoundPageContainer />
      </LayoutTemplateContainer>
    ),
    children: [
      {
        path: PATHS.ROOT,
        element: <HomePageContainer />,
      },
      {
        path: '/:lang',
        loader: ({ params }): Record<string, unknown> => {
          if (!AUTHORIZED_LANGUAGES.includes(params.lang as string)) {
            throw new Error('Lang not Found');
          }
          return {};
        },
        children: [
          {
            path: PATHS.HOME,
            element: <HomePageContainer />,
          },
          {
            path: PATHS.POKEMON_LIST,
            element: <PokemonListPageContainer />,
            loader: async (): Promise<{ pokemons: Array<{ name: string }> }> => {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=3&offset=0`).then(
                async (res) => await res.json()
              );
              return {
                pokemons: response.results,
              };
            },
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPageContainer />,
      },
    ],
  },
];
