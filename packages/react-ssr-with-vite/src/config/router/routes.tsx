import fetch from 'cross-fetch';
import React from 'react';
import { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { AUTHORIZED_LANGUAGES, PATHS } from '@/constants';
import { HomePage } from '@/pages/HomePage/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PokemonListPage } from '@/pages/PokemonListPage';
import { LayoutTemplate } from '@/templates/LayoutTemplate';

export const routes: RouteObject[] = [
  {
    element: (
      <LayoutTemplate>
        <Outlet />
      </LayoutTemplate>
    ),
    errorElement: (
      <LayoutTemplate>
        <NotFoundPage />
      </LayoutTemplate>
    ),
    children: [
      {
        path: PATHS.ROOT,
        element: <HomePage />,
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
            element: <HomePage />,
          },
          {
            path: PATHS.POKEMON_LIST,
            element: <PokemonListPage />,
            loader: async (): Promise<{ pokemons: { name: string }[] }> => {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=3&offset=0`).then((res) =>
                res.json()
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
        element: <NotFoundPage />,
      },
    ],
  },
];
