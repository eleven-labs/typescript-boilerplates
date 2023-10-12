import { request } from 'graphql-request';

import { GRAPHQL_GATEWAY_URL } from '@/constants';

export const fetcher =
  <TData, TVariables>(query: string, variables?: TVariables) =>
  async (): Promise<TData> =>
    await request(GRAPHQL_GATEWAY_URL, query, variables);
