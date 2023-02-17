import React from 'react';
import { RouteObject } from 'react-router';
import { generatePath, Outlet } from 'react-router-dom';

import { AUTHORIZED_LANGUAGES, PATHS } from '@/constants';
import { HomePage } from '@/pages/HomePage/HomePage';
import { OtherPage } from '@/pages/OtherPage';
import { LayoutTemplate } from '@/templates/LayoutTemplate';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routes: RouteObject[] = [
  {
    element: (
      <LayoutTemplate>
        <Outlet />
      </LayoutTemplate>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATHS.ROOT,
        element: <HomePage />,
      },
      ...AUTHORIZED_LANGUAGES.reduce<RouteObject[]>(
        (children, lang) => [
          ...children,
          {
            path: generatePath(PATHS.HOME, { lang }),
            element: <HomePage />,
          },
          {
            path: generatePath(PATHS.OTHER_PAGE, { lang }),
            element: <OtherPage />,
          },
        ],
        []
      ),
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ],
  },
];
