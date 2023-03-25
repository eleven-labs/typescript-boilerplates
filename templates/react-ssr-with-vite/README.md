# React SSR + SSG + Progressive Hydration with Vite

## Technologies used

- React
- Vite
- React Router
- I18Next
- Hoofd

## Patterns used

- [Server-side Rendering](https://www.patterns.dev/posts/server-side-rendering)
- [Progressive Hydration](https://www.patterns.dev/posts/progressive-hydration)
- [Static Rendering](https://www.patterns.dev/posts/static-rendering)

## To start the development server

```shell script
yarn start:dev
```

## To start the app in production in SSR mode

```shell script
yarn build
yarn start:prod
```

## To start the app in production in SSG mode

```shell script
yarn build
yarn prerender
yarn start:static
```
