import { User } from '@libs/shared/data-access/api/user/models';
import { Expose, Type } from 'class-transformer';

export class AuthResponse {
  @Type(() => User)
  @Expose()
  public user: User;

  @Expose()
  public token: string;
}
