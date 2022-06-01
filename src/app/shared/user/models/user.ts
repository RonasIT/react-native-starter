import { Expose } from 'class-transformer';
import { BaseEntity } from '@shared/base-entity/models';

export class User extends BaseEntity<number> {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public gender: string;

  @Expose()
  public status: string;

  constructor(user: Partial<User>) {
    super(user);
    Object.assign(this, user);
  }
}
