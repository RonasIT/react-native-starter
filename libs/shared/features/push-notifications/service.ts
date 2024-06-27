import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

class PushNotificationsService {
  public async obtainPushNotificationsToken(tokenType: 'expo' | 'device'): Promise<string | null> {
    let token = null;

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();

      if (existingStatus !== Permissions.PermissionStatus.GRANTED) {
        return null;
      }

      token = (
        tokenType === 'expo'
          ? await Notifications.getExpoPushTokenAsync({ projectId: Constants?.expoConfig?.extra?.eas.projectId }) //TODO Expo 49 workaround https://github.com/expo/expo/issues/23225#issuecomment-1624028839
          : await Notifications.getDevicePushTokenAsync()
      )?.data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      });
    }

    return token;
  }

  public async handleLastNotificationResponse(): Promise<void> {
    const response = await Notifications.getLastNotificationResponseAsync();

    if (response) {
      this.handleNotificationResponse(response);
    }
  }

  public handleNotificationResponse = (_: Notifications.NotificationResponse): void => {
    Linking.openURL(Linking.createURL('/'));
  };
}

export const pushNotificationsService = new PushNotificationsService();
