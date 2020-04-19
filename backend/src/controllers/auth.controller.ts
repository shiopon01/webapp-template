import * as express from 'express';
import { UserRequest } from 'src/interfaces';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from 'tsoa';

import { inject, ProvideSingleton } from '../ioc';
import { AuthService } from '../services/auth.service';

@Tags('auth')
@Route('/')
@ProvideSingleton(AuthController)
export class AuthController extends Controller {
  constructor(@inject(AuthService) private auth: AuthService) {
    super();
  }

  /**
   * ユーザー名とパスワードを渡してログインを行います。
   *
   * @summary ログイン機能
   * @param {Login} _requestBody
   * @param {Express.Request} request
   * @returns {LoginResponse}
   * @memberof AuthController
   */
  @Post('login')
  @Security('login')
  @Response('400', 'パラメーター不足', {
    message: 'username and password required',
  })
  @Response('401', '認証エラー', {
    message: 'invalid token',
  })
  public login(
    @Body() _requestBody: Login,
    @Request() request: express.Request
  ): LoginResponse {
    // ミドルウェアでログイン処理までしているので必ずsuccess
    return { message: 'success', user: request.user };
  }

  /**
   * ログアウトを行います。
   *
   * @summary ログアウト機能
   * @param {Express.Request} request
   * @returns {void}
   * @memberof AuthController
   */
  @Get('logout')
  @Security('auth')
  @Response('401', '認証エラー', { message: 'token required' })
  public logout(@Request() request: UserRequest): LogoutResponse {
    try {
      console.log(request.user);
      this.auth.logout(request.user.accessToken20);
    } catch (err) {
      console.log(err);
    }
    return { message: 'success' };
  }
}

// NOTE: tsoaで外部からインポートしたinterfaceを使用できない
// https://tsoa-docs.netlify.app/external-interfaces.html

interface Login {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: any;
}

interface LogoutResponse {
  message: string;
}
