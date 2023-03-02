import { useMatches } from 'react-router-dom';

export const useCurrentPath = (): string => {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];

  return Object.entries(lastMatch.params).reduce((currentPath, [key, value]) => {
    return currentPath.replace(value || '', `:${key}`);
  }, lastMatch.pathname);
};
