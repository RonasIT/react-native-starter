import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { pushNotificationsService } from '../service';

export const useLastPushNotificationResponse = (): Notifications.NotificationResponse => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (lastNotificationResponse) {
      pushNotificationsService.handleNotificationResponse(lastNotificationResponse);
    }
  }, [lastNotificationResponse]);

  return lastNotificationResponse as Notifications.NotificationResponse;
};
