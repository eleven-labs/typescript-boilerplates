import { Headers, Request } from 'cross-fetch';
import type express from 'express';

export const createFetchHeaders = (requestHeaders: express.Request['headers']): Headers => {
  const headers = new Headers();

  for (const [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
};

export const createRequestByExpressRequest = (request: express.Request): Request => {
  const origin: string = `${request.protocol}://${request.get('host') as string}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(request.originalUrl || request.url, origin);

  const controller = new AbortController();

  request.on('close', () => {
    controller.abort();
  });

  const init: RequestInit = {
    headers: createFetchHeaders(request.headers),
    method: request.method,
    signal: controller.signal,
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body;
  }

  return new Request(url.href, init);
};

export const createRequestByUrl = (options: { origin?: string; url: string }): Request => {
  const controller = new AbortController();

  const init = {
    headers: new Headers(),
    method: 'GET',
    signal: controller.signal,
  };
  return new Request(new URL(options.url, options.origin ?? 'http://localhost').href, init);
};
