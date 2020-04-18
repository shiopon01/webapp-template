import * as express from 'express';
import { AuthService } from './services/auth.service';

export const expressAuthentication = async (
  request: express.Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> => {
  const auth = new AuthService();
  switch (securityName) {
    case 'login':
      const result: any = await auth.login(request);
      if (result.authenticated) {
        return result.user;
      }
      // ログインエラー
      throw result;

    case 'auth':
      return Promise.resolve({
        id: 3000,
        name: securityName,
        accessToken: 'sample',
      });
  }
  throw Promise.reject({});
};
