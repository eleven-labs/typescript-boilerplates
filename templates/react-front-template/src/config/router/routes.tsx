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
    children: [
      {
        element: <HomePageContainer />,
        path: PATHS.ROOT,
      },
      {
        children: [
          {
            element: <HomePageContainer />,
            path: PATHS.HOME,
          },
          {
            element: <PokemonListPageContainer />,
            path: PATHS.POKEMON_LIST,
          },
        ],
        loader: ({ params }): Record<string, unknown> => {
          if (!AUTHORIZED_LANGUAGES.includes(params.lang as string)) {
            throw new Error('Lang not Found');
          }
          return {};
        },
        path: '/:lang',
      },
      {
        element: <NotFoundPageContainer />,
        path: '*',
      },
    ],
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
  },
];
