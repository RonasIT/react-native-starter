import { createAction } from '@reduxjs/toolkit';

export class AppActions {
  public static init = createAction(
    '[App] Init'
  );

  public static noop = createAction(
    '[App] Noop'
  );
}
