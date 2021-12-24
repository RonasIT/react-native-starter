import { BaseEntity } from '@shared/base-entity/models';
import { Expose } from 'class-transformer';

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
