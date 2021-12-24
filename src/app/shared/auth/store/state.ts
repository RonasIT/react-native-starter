export class AuthState {
  public token?: string;
  public isTokenLoaded: boolean;

  constructor() {
    this.isTokenLoaded = false;
  }
}
