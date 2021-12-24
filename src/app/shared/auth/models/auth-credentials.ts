import { Expose } from 'class-transformer';

export class AuthCredentials {
  @Expose()
  public email: string;

  @Expose()
  public password: string;

  constructor(credentials: Partial<AuthCredentials>) {
    Object.assign(this, credentials);
  }
}
