import './HomePage.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          React SSR with Vite + React Router + I18Next + Hoofd
        </h1>
        <div className="flex items-center justify-center">
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src="/react.svg" className="logo react" alt="React logo" />
          </a>
        </div>
        <p
          className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
          dangerouslySetInnerHTML={{
            __html: t('pages.home.description'),
          }}
        />
      </div>
    </section>
  );
};
