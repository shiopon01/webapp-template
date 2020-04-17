import * as express from 'express';

export function expressAuthentication(
  _request: express.Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> {
  switch (securityName) {
    case 'login':
      return Promise.resolve({
        id: 2000,
        name: securityName,
      });
  }
  throw Promise.reject({});
}
