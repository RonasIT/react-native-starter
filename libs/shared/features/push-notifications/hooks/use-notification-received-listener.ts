import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export const useNotificationReceivedListener = ({
  onNotificationReceived
}: {
  onNotificationReceived: (notification: Notifications.Notification) => void;
}): void => {
  useEffect(() => {
    const listener = Notifications.addNotificationReceivedListener((notification) => {
      onNotificationReceived?.(notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(listener);
    };
  }, []);
};
