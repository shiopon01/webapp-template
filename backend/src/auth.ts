/**
 * コントローラーの @Security デコレータで実行される処理
 * 処理内容はsecurityNameで分岐させる（ログイン・ログインチェック処理）
 *
 * tsoa的にscopesには権限など（["read", "write"]）とかを入れる想定らしい
 */

import * as express from 'express';
import { AuthService } from './services/auth.service';

export const expressAuthentication = async (
  request: express.Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> => {
  const auth = new AuthService();
  switch (securityName) {
    case 'local':
      // ログイン処理
      const loginResult: any = await auth.login(request);
      if (loginResult.authenticated) {
        return loginResult.payload;
      }
      // ログインエラー
      throw loginResult.payload;

    case 'bearer':
      // ログインチェック処理
      const checkResult: any = await auth.isLogin(request);
      if (checkResult.authenticated) {
        return checkResult.payload;
      }
      // 未ログイン
      throw checkResult.payload;
  }
  throw Promise.reject({});
};
