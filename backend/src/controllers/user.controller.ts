import * as express from 'express';
import { Body, Controller, Get, Post, Request, Route, Security } from 'tsoa';

import { RequestBody, User } from '../interfaces/user';
import { inject, ProvideSingleton } from '../ioc';
import { TestService } from '../services/test.service';
import { createUser, getUser } from '../services/user.service';

@Route('users')
@ProvideSingleton(UsersController)
export class UsersController extends Controller {
  constructor(@inject(TestService) private test: TestService) {
    super();
  }

  /**
   * IDからユーザー情報を取得
   *
   * @summary ユーザー情報取得
   * @param {number} id
   * @param {express.Request} request
   * @returns {(User | {})}
   * @memberof UsersController
   */
  @Get('/{id}')
  @Security('auth')
  public getUser(id: number, @Request() request: express.Request): User | {} {
    console.log(request.user);

    this.test.sample();

    return { user: getUser(id), request };
  }

  /**
   * 新しいユーザーを作成
   *
   * @summary 新規ユーザー作成
   * @param {RequestBody} requestBody
   * @returns {string}
   * @memberof UsersController
   */
  @Post('/create')
  @Security('auth')
  public createUser(@Body() requestBody: RequestBody): string {
    createUser(requestBody);
    this.test.sample();
    return 'success';
  }
}
