import { defineAction } from '../../../../libs/shared/data-access/store/utils';

export class PushNotificationsActions {
  public static subscribe = defineAction<{ pushToken: string }>(
    '[PushNotifications] Subscribe'
  );

  public static subscribeSuccess = defineAction<{ pushToken: string }>(
    '[PushNotifications] Subscribe Success'
  );

  public static subscribeFailure = defineAction<{ error: any }>(
    '[PushNotifications] Subscribe Failure'
  );

  public static reSubscribe = defineAction(
    '[PushNotifications] Re-subscribe'
  );
}
