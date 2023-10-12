# React Front Template

## Context

This repositories contains templates that we should use to bootstrap new GraphQL Gateway.

It contains:
- basic React configuration
- CI/CD configuration
- React Router configurations
- I18Next configurations
- GraphQL configurations

## How to use?

1. Create a new Github repository using this template.

2. Replace all the places where there is `react-front-template` with the name of your repository

3. Commit and push.

## Installation

```bash
$ make install
```

## Running the app

```bash
$ make start-server
```

## Unit Tests

```bash
$ make unit-tests
```

## GraphQL

To use GraphQL with react, we use two libraries:

- [GraphQL Codegen](https://the-guild.dev/graphql/codegen)

    It's role will be to generate the hooks of the queries and mutations that we have created in the `.graphql` files 

- [React Query](https://tanstack.com/query/v4/docs/react/graphql)

    Similar to React Apollo on the use of hooks Query and Mutation, the only difference is that this one has a simplified cache management which will avoid many bugs in the case of refetch and cache policy.
    
Example of usage for a query:

```
...
import { usePokemonsQuery } from '@/graphql';

export const Component = (): React.FC => {
    const pokemonsResult = usePokemonsQuery();
    
    return (
        {(pokemonsResult.isLoading && pokemons?.length) ? (
            <span>Loading ...</span>
        ) : (
            <div>
                {pokemonsResult.data?.pokemons?.results.map((pokemonItem) => (
                    <h1>
                      {pokemonItem.name}
                    </h1>
                ))}
            </div>
        )}
    )
}
```

Example of usage to invalidate a query:

```
...
import { useQueryClient } from '@tanstack/react-query';
import { namedOperations } from '@/graphql';

export const Component = (): React.FC => {
    const queryClient = useQueryClient();
    const invalidateCachePokemonsQuery = (): void => {
        queryClient.invalidateQueries({ queryKey: [namedOperations.Query.Pokemons] });
    };
}
```
