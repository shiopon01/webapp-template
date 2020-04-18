import * as express from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
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
   * @param {express.Request} request
   * @returns {LoginResponse}
   * @memberof AuthController
   */
  @Post('login')
  @Security('login')
  // @Response<ErrorResponseModel>('400', 'Bad Request', {
  //   status: 400,
  //   message: 'Bad Request',
  // })
  public login(
    @Body() _requestBody: Login,
    @Request() request: express.Request
  ): any {
    // ミドルウェアでログイン処理までしているので必ずsuccess
    return { message: 'success', user: request.user };
  }

  /**
   * ログアウトを行います。
   *
   * @summary ログアウト機能
   * @param {express.Request} request
   * @returns {void}
   * @memberof AuthController
   */
  @Get('logout')
  @Security('auth')
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

export interface UserRequest extends express.Request {
  user: any;
}

export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: any;
}

export interface LogoutResponse {
  message: string;
}

export interface ErrorResponseModel {
  status: number;
  message: string;
}
