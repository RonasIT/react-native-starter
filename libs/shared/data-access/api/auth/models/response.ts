import { Expose, Type } from 'class-transformer';
import { User } from '@libs/shared/data-access/api/user/models';

export class AuthResponse {
  @Type(() => User)
  @Expose()
  public user: User;

  @Expose()
  public token: string;
}
