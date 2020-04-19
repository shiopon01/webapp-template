import * as express from 'express';
import { Body, Controller, Get, Post, Request, Route, Security } from 'tsoa';

import { User } from '../interfaces/user';
import { inject, ProvideSingleton } from '../ioc';
import { UserService } from '../services/user.service';

@Route('users')
@ProvideSingleton(UsersController)
export class UsersController extends Controller {
  constructor(@inject(UserService) private user: UserService) {
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
  @Security('bearer')
  async getUser(
    id: number,
    @Request() _request: express.Request
  ): Promise<User | {}> {
    return await this.user.find(id);
  }

  /**
   * 新しいユーザーを作成
   *
   * @summary 新規ユーザー作成
   * @param {any} requestBody
   * @returns {string}
   * @memberof UsersController
   */
  @Post('/')
  @Security('bearer')
  async createUser(@Body() _requestBody: any): Promise<string> {
    await this.user.create();
    return 'success';
  }
}
