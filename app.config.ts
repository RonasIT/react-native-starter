import { ExpoConfig } from '@expo/config';
import { EASConfig } from 'expo-constants/build/Constants.types';
import { AppEnv } from './src/libs/shared/utils/app-env/env';

export type AppEnvName = 'development' | 'staging' | 'production';
export type AppExpoConfig = ReturnType<typeof createConfig>;

const createConfig = (): Omit<ExpoConfig, 'extra'> & { extra: { eas: EASConfig } & typeof extra } => {
  const appEnv = new AppEnv((process.env.APP_ENV as AppEnvName) || 'development');

  const projectId = appEnv.select({
    development: '46e76b70-a4ff-4935-83ca-aaae5a36d7f0',
    staging: 'STAGING_PROJECT_ID',
    production: 'PRODUCTION_PROJECT_ID'
  });

  const extra = {
    env: appEnv.current,
    eas: { projectId }
  };

  return {
    name: appEnv.select({
      development: 'RN Starter Dev',
      staging: 'RN Starter Stg',
      production: 'RN Starter Prod'
    }),
    slug: appEnv.select({
      development: 'react-native-starter-dev',
      staging: 'react-native-starter-stg',
      production: 'react-native-starter-prod'
    }),
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
    icon: './src/assets/images/icon.png',
    splash: {
      image: './src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#000000'
    },
    assetBundlePatterns: [
      './src/assets/images/*',
      './src/libs/account-access/assets/images/*',
      './src/assets/fonts/*',
      './src/assets/i18n/*'
    ],
    userInterfaceStyle: 'dark',
    ios: {
      buildNumber: '1',
      supportsTablet: false,
      bundleIdentifier: appEnv.select({
        development: 'com.ronasit.rnstarter.dev',
        staging: 'com.ronasit.rnstarter.stg',
        production: 'com.ronasit.rnstarter'
      }),
      backgroundColor: '#000000',
      config: {
        usesNonExemptEncryption: false
      }
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
    web: {
      favicon: './src/assets/images/favicon.png'
    },
    packagerOpts: {
      config: 'metro.config.js',
      sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json', 'wasm', 'svg']
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
