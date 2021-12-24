import { Expose, Type } from 'class-transformer';
import { User } from '@shared/user/models';

export class AuthResponse {
  @Type(() => User)
  @Expose()
  public user: User;

  @Expose()
  public token: string;
}
