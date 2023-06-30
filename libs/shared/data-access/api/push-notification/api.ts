import { axiosBaseQuery, createAppApi } from '@libs/shared/data-access/api-client';
import { retry } from '@reduxjs/toolkit/query';
import { instanceToPlain } from 'class-transformer';
import { PushNotificationSubscriptionRequest } from './models';

export const pushNotificationAPI = createAppApi({
  reducerPath: 'push-notification',
  baseQuery: retry(axiosBaseQuery),
  endpoints: (builder) => ({
    subscribeDevice: builder.mutation<void, PushNotificationSubscriptionRequest>({
      query: (params) => {
        const request = instanceToPlain(new PushNotificationSubscriptionRequest(params));

        return {
          method: 'post',
          url: '/api/exponent/devices/subscribe',
          data: request
        };
      }
    }),
    unsubscribeDevice: builder.mutation<void, string>({
      query: (accessToken) => ({
        method: 'post',
        url: '/api/exponent/devices/unsubscribe',
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    })
  })
});
