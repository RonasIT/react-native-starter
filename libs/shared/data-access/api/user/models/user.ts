import { Expose } from 'class-transformer';
import { BaseEntity } from '@libs/shared/data-access/entity-api';
import { UserGender, UserStatus } from '../enums';

export class User extends BaseEntity<number> {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public gender: UserGender;

  @Expose()
  public status: UserStatus;

  constructor(user: Partial<User>) {
    super(user);
    Object.assign(this, user);
  }
}
