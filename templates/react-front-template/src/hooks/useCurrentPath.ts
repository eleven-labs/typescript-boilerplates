import { useMatches } from 'react-router-dom';

export const useCurrentPath = (): string | undefined => {
  const matches = useMatches();
  const lastMatch = matches.at(-1);

  return lastMatch
    ? Object.entries(lastMatch.params).reduce(
        (currentPath, [key, value]) => currentPath.replace(value ?? '', `:${key}`),
        lastMatch.pathname
      )
    : undefined;
};
