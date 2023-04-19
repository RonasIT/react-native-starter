import { Expose, Type } from 'class-transformer';
import { User } from '@shared/data-access/user';

export class AuthResponse {
  @Type(() => User)
  @Expose()
  public user: User;

  @Expose()
  public token: string;
}
