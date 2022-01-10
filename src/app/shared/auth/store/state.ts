export class AuthState {
  public token?: string;
  public isTokenLoaded: boolean;
  public isAuthorizing: boolean;

  constructor() {
    this.isTokenLoaded = false;
    this.isAuthorizing = false;
  }
}
