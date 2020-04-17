import { ProvideSingleton } from '../ioc';

@ProvideSingleton(TestService)
export class TestService {
  constructor() {}

  sample() {
    console.log('sample service');
  }
}
