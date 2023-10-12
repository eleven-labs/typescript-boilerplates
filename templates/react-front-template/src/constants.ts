import { getEnv } from '@/helpers/getEnv';

export const LanguageEnum = {
  EN: 'en',
  FR: 'fr',
};

export const AUTHORIZED_LANGUAGES: string[] = Object.values(LanguageEnum);
export const DEFAULT_LANGUAGE: string = LanguageEnum.FR;
export const PATHS = {
  HOME: '/:lang/',
  POKEMON_LIST: '/:lang/pokemon-list/',
  ROOT: '/',
};
export const IS_DEV = getEnv<boolean>('DEV');
export const GRAPHQL_GATEWAY_URL = getEnv<string>('VITE_GRAPHQL_GATEWAY_URL');
export const TRANSLATIONS_ENDPOINT_URI = getEnv<string>('VITE_TRANSLATIONS_ENDPOINT_URI');
