import { appEnv } from '@libs/shared/utils/app-env';

// TODO: Demo configuration. Update in a real app
export const apiConfig = {
  root: appEnv.select({
    development: 'https://gorest.co.in/public/v1',
    staging: '',
    production: ''
  }),
  publicEndpoints: ['/login'],
  refreshTokenEndpoint: 'auth/refresh'
};
