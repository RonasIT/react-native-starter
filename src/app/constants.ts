import Constants from 'expo-constants';
import { merge } from 'lodash';
import { PartialDeep } from 'type-fest';
import { AppEnvConfig } from 'app.config';

export const appEnvConfig = Constants.expoConfig.extra as AppEnvConfig;
export const appEnv = appEnvConfig.env;

function createConfig(): typeof defaultAppConfig {
  // TODO: Demo configuration. Update in a real app
  const defaultAppConfig = {
    production: false,
    sentry: {
      enabled: false,
      dsn: 'https://your-sentry-dsn'
    },
    api: {
      root: 'https://gorest.co.in/public/v1',
      publicEndpoints: ['/login', '/users'],
      refreshTokenEndpoint: 'auth/refresh'
    }
  };
  let envAppConfig: PartialDeep<typeof defaultAppConfig> = {};

  switch (appEnv) {
    case 'production':
      envAppConfig = {
        production: true
      };
      break;
    case 'development':
    default:
      break;
  }

  return merge(defaultAppConfig, envAppConfig);
}

export const appConfig = createConfig();
