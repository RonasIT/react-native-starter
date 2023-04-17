import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { apiService } from '../../../libs/shared/data-access/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

class PushNotificationsService {
  public get pushToken(): string {
    return this._pushToken;
  }

  private _pushToken?: string;

  public async obtainPushNotificationsToken(): Promise<string> {
    let token: string;

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== Permissions.PermissionStatus.GRANTED) {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== Permissions.PermissionStatus.GRANTED) {
        return null;
      }

      token = (await Notifications.getExpoPushTokenAsync())?.data;
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

  public subscribeDevice(token: string): Observable<void> {
    return apiService.post('api/exponent/devices/subscribe', { expo_token: token }).pipe(
      tap(() => (this._pushToken = token)),
      catchError((error) => {
        delete this._pushToken;

        return throwError(() => error);
      })
    );
  }

  public unsubscribeDevice(): Observable<void> {
    delete this._pushToken;

    return apiService.post('api/exponent/devices/unsubscribe');
  }

  public async handleLastNotificationResponse(): Promise<void> {
    const response = await Notifications.getLastNotificationResponseAsync();
    this.handleNotificationResponse(response);
  }

  public handleNotificationResponse = (_: Notifications.NotificationResponse): void => {
    Linking.openURL(Linking.createURL('/'));
  };
}

export const pushNotificationsService = new PushNotificationsService();
