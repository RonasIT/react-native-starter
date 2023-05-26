import { instanceToPlain, plainToInstance } from 'class-transformer';
import { pickBy } from 'lodash';
import { createAppApi } from '@libs/shared/data-access/api-client';
import { User } from '@libs/shared/data-access/api/user/models';

export const profileAPI = createAppApi({
  reducerPath: 'profile',
  tagTypes: ['profile'],
  endpoints: (builder) => ({
    // TODO: Demo code. Remove in a real app.
    getDemo: builder.query<User, void>({
      query: () => ({
        method: 'get',
        url: '/users'
      }),
      transformResponse: (response: { data: Array<object> }) => plainToInstance(User, response.data[0]),
      providesTags: ['profile']
    }),
    get: builder.query<User, void>({
      query: () => ({
        method: 'get',
        url: '/profile'
      }),
      transformResponse: (response) => plainToInstance(User, response),
      providesTags: ['profile']
    }),
    update: builder.mutation<User, User>({
      query: (params) => {
        const request = pickBy(instanceToPlain(params));

        return {
          method: 'put',
          url: '/profile',
          data: request
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        dispatch(
          profileAPI.util.updateQueryData(
            'get',
            null,
            (data) => new User({
              ...data,
              ...args
            })
          )
        );
      }
    })
  })
});
