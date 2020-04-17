import * as express from 'express';

export function expressAuthentication(
  _request: express.Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> {
  return Promise.resolve({
    id: 2000,
    name: securityName,
  });
}

// if (securityName === 'api_token') {
//   let token;
//   if (request.query && request.query.access_token) {
//     token = request.query.access_token;
//   }

//   if (token === 'abc123456') {
//     return Promise.resolve({
//       id: 1,
//       name: 'Ironman',
//     });
//   } else {
//     return Promise.reject({});
//   }
// }
