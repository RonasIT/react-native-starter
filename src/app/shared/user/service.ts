import { EntityService } from '@shared/base-entity/service';
import { User } from './models';

class UserService extends EntityService<User> {
  public create = this.notImplementedMethod('create');
  public update = this.notImplementedMethod('update');
  public delete = this.notImplementedMethod('update');

  constructor() {
    super({
      endpoint: '/users',
      entityName: 'user'
    });
  }
}

export const userService = new UserService();
