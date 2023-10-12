import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useHead } from 'hoofd';
import { type i18n } from 'i18next';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from '@/config/router';
import { IS_DEV } from '@/constants';
import { queryClient } from '@/graphql/client';

export const RootContainer: React.FC<{ i18n: i18n }> = ({ i18n }) => {
  const router = createBrowserRouter(routes);
  useHead({
    language: i18n.language,
    title: 'Eleven Labs - ',
  });
  return (
    <QueryClientProvider client={queryClient}>
      {IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </QueryClientProvider>
  );
};
