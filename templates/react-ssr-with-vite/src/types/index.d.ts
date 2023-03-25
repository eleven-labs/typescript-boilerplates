import { type Resource } from 'i18next';

export {};

declare global {
  interface Window {
    initialI18nStore: Resource;
    initialLanguage: string;
  }
}
