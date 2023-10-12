module.exports = {
  overwrite: true,
  schema: process.env.VITE_GRAPHQL_GATEWAY_URL,
  documents: ['src/**/*.graphql'],
  generates: {
    'src/graphql/types-and-hooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
        'named-operations-object'
      ],
      config: {
        maybeValue: 'T',
        fetcher: {
          func: './fetcher#fetcher',
        },
      }
    },
  },
};
