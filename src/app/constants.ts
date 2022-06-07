import Constants from 'expo-constants';
import { immutableMerge } from '@shared/immutable-merge';
import { appEnvConfig } from 'app.config';

export const appEnv = (Constants.manifest.extra as typeof appEnvConfig).env;

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
      refreshTokenEndpoint: '/auth/refresh'
    }
  };

  switch (appEnv) {
    case 'production':
      return immutableMerge(defaultAppConfig, {
        production: true
      });
    case 'development':
    default:
      return defaultAppConfig;
  }
}

export const appConfig = createConfig();
