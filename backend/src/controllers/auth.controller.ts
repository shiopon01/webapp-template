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
  Response,
} from 'tsoa';

import { inject, ProvideSingleton } from '../ioc';
import { TestService } from '../services/test.service';

@Tags('auth')
@Route('/')
@ProvideSingleton(AuthController)
export class AuthController extends Controller {
  constructor(@inject(TestService) private test: TestService) {
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
  public login(
    @Body() _requestBody: Login,
    @Request() request: express.Request
  ): LoginResponse {
    // ミドルウェアでログイン処理までしているため必ずsuccessを返す
    return { message: 'success', user: request.user };
  }

  @Response<ErrorResponseModel>('400', 'Bad Request')
  @Response<ErrorResponseModel>('401', 'Unauthorized')
  @Response<ErrorResponseModel>('default', 'Unexpected error', {
    status: 500,
    message: 'Something went wrong!',
  })
  @Get('logout')
  public logout(@Request() request: express.Request): void {
    console.log(request.user);
    this.test.sample();
    return;
  }
}

export interface Login {
  name: string;
}

export interface LoginResponse {
  message: string;
  user: any;
}

export interface ErrorResponseModel {
  status: number;
  message: string;
}
