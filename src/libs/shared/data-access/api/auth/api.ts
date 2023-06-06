import { instanceToPlain, plainToInstance } from 'class-transformer';
import { User } from '@libs/shared/data-access/api/user/models';
import { createAppApi } from '@libs/shared/data-access/api-client';
import { profileAPI } from '../profile/api';
import { AuthCredentials, AuthResponse } from './models';

export const authAPI = createAppApi({
  reducerPath: 'authAPI',
  endpoints: (builder) => ({
    // TODO: Demo code. Remove in a real app.
    demoAuthorize: builder.mutation<AuthResponse, AuthCredentials>({
      query: () => ({
        method: 'get',
        url: '/users'
      }),
      transformResponse: (response: { data: Array<object> }) => ({
        user: plainToInstance(User, response.data[0]),
        token: '1d606297f5cb48a0bd5dff4fb04f4922c7844478e32cfe1ac293a4393bd1887f'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(profileAPI.util.upsertQueryData('getDemo', undefined, data.user));
      }
    }),
    authorize: builder.mutation<AuthResponse, AuthCredentials>({
      query: (params) => ({
        method: 'post',
        url: '/login',
        data: instanceToPlain(params)
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(profileAPI.util.upsertQueryData('get', undefined, data.user));
      },
      transformResponse: (response) => plainToInstance(AuthResponse, response)
    })
  })
});
