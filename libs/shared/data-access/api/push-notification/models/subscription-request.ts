import { Expose } from 'class-transformer';

export class PushNotificationSubscriptionRequest {
  @Expose({ name: 'expo_token' })
  public expoToken: string;

  constructor(request: PushNotificationSubscriptionRequest) {
    Object.assign(this, request);
  }
}
