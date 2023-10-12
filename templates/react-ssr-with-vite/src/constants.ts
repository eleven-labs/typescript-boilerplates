import { getEnv } from '@/helpers/getEnvHelper';

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
export const IS_PROD = getEnv<boolean>('PROD');
export const IS_SSR = getEnv<boolean>('SSR');
export const BASE_URL = getEnv<string>('BASE_URL');
