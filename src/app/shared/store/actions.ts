import { action } from './action-factory';

export class AppActions {
  public static init = action(
    '[App] Init'
  );

  public static noop = action(
    '[App] Noop'
  );
}
