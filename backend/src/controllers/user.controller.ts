import {
  Body,
  Controller,
  Get,
  // Header,
  // Path,
  Post,
  // Query,
  Route,
  // SuccessResponse,
} from 'tsoa';
import { User, RequestBody } from '../domains/user';
import { getUser, createUser } from '../services/user.service';

@Route('users')
export class UsersController extends Controller {
  // IDをPATHに含めたGETなAPIを定義
  @Get('/get/{id}')
  public getUser(id: number): User | {} {
    return getUser(id);
  }
  // POSTなAPI
  @Post('/create')
  public createUser(@Body() requestBody: RequestBody): string {
    createUser(requestBody);
    return 'success';
  }
}
