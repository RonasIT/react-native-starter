import { ExpoConfig } from '@expo/config';
import { EASConfig } from 'expo-constants/build/Constants.types';
import { AppEnv } from './libs/shared/utils/app-env/env';

export type AppEnvName = 'development' | 'staging' | 'production';
export type AppExpoConfig = ReturnType<typeof createConfig>;

const createConfig = (): Omit<ExpoConfig, 'extra'> & {
  extra: { eas: EASConfig } & typeof extra;
  experiments: { tsconfigPaths: boolean };
} => {
  const appEnv = new AppEnv((process.env.APP_ENV as AppEnvName) || 'development');

  const projectId = '46e76b70-a4ff-4935-83ca-aaae5a36d7f0';

  const extra = {
    env: appEnv.current,
    eas: { projectId }
  };

  return {
    experiments: {
      tsconfigPaths: true
    },
    name: appEnv.select({
      development: 'RN Starter Dev',
      staging: 'RN Starter Stg',
      production: 'RN Starter Prod'
    }),
    slug: 'react-native-starter-dev',
    scheme: appEnv.select({
      development: 'rnstarterdev',
      staging: 'rnstarterstg',
      production: 'rnstarter'
    }),
    owner: 'ronas_it',
    version: '0.0.1',
    runtimeVersion: {
      policy: 'sdkVersion'
    },
    updates: {
      url: `https://u.expo.dev/${projectId}`
    },
    orientation: 'portrait',
    backgroundColor: '#000000',
    icon: './libs/shared/ui/ui-kit/assets/images/icon.png',
    splash: {
      image: './libs/shared/ui/ui-kit/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#000000'
    },
    userInterfaceStyle: 'dark',
    ios: {
      buildNumber: '1',
      supportsTablet: false,
      bundleIdentifier: appEnv.select({
        development: 'com.ronasit.rnstarter.dev',
        staging: 'com.ronasit.rnstarter.stg',
        production: 'com.ronasit.rnstarter'
      }),
      backgroundColor: '#000000'
    },
    android: {
      versionCode: 1,
      package: appEnv.select({
        development: 'com.ronasit.rnstarter.dev',
        staging: 'com.ronasit.rnstarter.stg',
        production: 'com.ronasit.rnstarter'
      }),
      permissions: []
    },
    plugins: ['expo-localization', 'sentry-expo'],
    web: {
      favicon: './libs/shared/ui/ui-kit/assets/images/favicon.png',
      bundler: 'metro'
    },
    // TODO: Configure this to use Sentry or remove
    // hooks: {
    //   postPublish: [
    //     {
    //       file: 'sentry-expo/upload-sourcemaps',
    //       config: {
    //         url: 'https://your-sentry-url',
    //         organization: 'your-sentry-organization',
    //         project: 'your-sentry-project',
    //       }
    //     }
    //   ]
    // },
    // plugins: ['sentry-expo'],
    extra
  };
};

module.exports = createConfig;
