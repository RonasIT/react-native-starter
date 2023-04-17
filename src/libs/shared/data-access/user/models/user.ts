import { Expose } from 'class-transformer';
import { BaseEntity } from '../../base-entity/models';

export class User extends BaseEntity<number> {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  constructor(user: User) {
    super(user);
    Object.assign(this, user);
  }
}
