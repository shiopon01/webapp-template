import * as express from 'express';
import { Body, Controller, Get, Post, Request, Route, Security } from 'tsoa';

import { RequestBody, User } from '../domains/user';
import { inject, ProvideSingleton } from '../ioc';
import { TestService } from '../services/test.service';
import { createUser, getUser } from '../services/user.service';

@Route('users')
@ProvideSingleton(UsersController)
export class UsersController extends Controller {
  constructor(@inject(TestService) private test: TestService) {
    super();
  }

  // IDをPATHに含めたGETなAPIを定義
  @Get('/{id}')
  @Security('login')
  public getUser(id: number, @Request() request: express.Request): User | {} {
    console.log(request.user);

    this.test.sample();

    return { user: getUser(id), request };
  }

  // POSTなAPI
  @Post('/create')
  public createUser(@Body() requestBody: RequestBody): string {
    createUser(requestBody);
    this.test.sample();
    return 'success';
  }
}
