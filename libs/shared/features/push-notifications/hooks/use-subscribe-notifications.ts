import { useEffect, useState } from 'react';
import { pushNotificationAPI } from '@libs/shared/data-access/api/push-notification/api';
import { pushNotificationsService } from '../service';

export const useSubscribeNotifications = (accessToken?: string): void => {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [savedAccessToken, setSavedAccessToken] = useState<string>();

  const [subscribeDevice] = pushNotificationAPI.useSubscribeDeviceMutation();
  const [unsubscribeDevice] = pushNotificationAPI.useUnsubscribeDeviceMutation();

  const handleSubscribeDevice = async (): Promise<void> => {
    const expoToken = await pushNotificationsService.obtainPushNotificationsToken();

    if (expoToken) {
      setExpoPushToken(expoToken);
      subscribeDevice({ expoToken });
    }
  };

  useEffect(() => {
    if (accessToken) {
      setSavedAccessToken(accessToken);
      handleSubscribeDevice();
    } else if (!!savedAccessToken && !!expoPushToken) {
      unsubscribeDevice(savedAccessToken);
    }
  }, [accessToken]);
};
