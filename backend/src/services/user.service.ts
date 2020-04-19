import { ProvideSingleton } from '../ioc';
import { User } from '../interfaces/user';

@ProvideSingleton(UserService)
export class UserService {
  constructor() {}

  async find(id: number): Promise<User | {}> {
    // FIXME: mock
    return {
      id,
      username: 'kenny',
    };
  }

  async create(): Promise<User | {}> {
    // FIXME: mock
    return {
      id: 100,
      username: 'bob',
    };
  }
}
