import { Expose, Type } from 'class-transformer';
import { User } from '../../user';

export class AuthResponse {
  @Type(() => User)
  @Expose()
  public user: User;

  @Expose()
  public token: string;
}
