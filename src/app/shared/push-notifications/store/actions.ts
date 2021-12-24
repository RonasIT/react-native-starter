import { action, actionWithPayload } from '@store/action-factory';

export class PushNotificationsActions {
  public static subscribe = actionWithPayload<{ pushToken: string }>(
    '[PushNotifications] Subscribe'
  );

  public static subscribeSuccess = actionWithPayload<{ pushToken: string }>(
    '[PushNotifications] Subscribe Success'
  );

  public static subscribeFailure = actionWithPayload<{ error: any }>(
    '[PushNotifications] Subscribe Failure'
  );

  public static reSubscribe = action(
    '[PushNotifications] Re-subscribe'
  );
}
