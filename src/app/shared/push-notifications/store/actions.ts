import { createAction } from '@reduxjs/toolkit';

export class PushNotificationsActions {
  public static subscribe = createAction<{ pushToken: string }>(
    '[PushNotifications] Subscribe'
  );

  public static subscribeSuccess = createAction<{ pushToken: string }>(
    '[PushNotifications] Subscribe Success'
  );

  public static subscribeFailure = createAction<{ error: any }>(
    '[PushNotifications] Subscribe Failure'
  );

  public static reSubscribe = createAction(
    '[PushNotifications] Re-subscribe'
  );
}
