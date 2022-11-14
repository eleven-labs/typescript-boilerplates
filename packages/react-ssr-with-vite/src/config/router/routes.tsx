import React from 'react';
import { RouteObject } from 'react-router';

import { AUTHORIZED_LANGUAGES, PATHS } from '@/constants';
import { HomePage } from '@/pages/HomePage/HomePage';

export const routes: RouteObject[] = [PATHS.ROOT, ...AUTHORIZED_LANGUAGES].map((lang) => ({
  path: lang.length > 1 ? `/${lang}` : PATHS.ROOT,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
}));
