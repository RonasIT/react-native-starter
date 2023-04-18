import { ExpoConfig } from '@expo/config';
import { merge } from 'lodash';
import { PartialDeep } from 'type-fest';

export type AppEnv = 'development' | 'staging' | 'production';
export type AppEnvConfig = typeof defaultAppEnvConfig;
export type AppExpoConfig = ExpoConfig & { extra: AppEnvConfig };

const projectID: Record<AppEnv, string> = {
  development: '46e76b70-a4ff-4935-83ca-aaae5a36d7f0',
  staging: 'STAGING_PROJECT_ID',
  production: 'PRODUCTION_PROJECT_ID'
};

const defaultAppEnvConfig = {
  env: <AppEnv>'development',
  eas: {
    projectId: projectID.development
  }
};

const defaultExpoConfig: ExpoConfig = {
  name: 'RN Starter Dev',
  slug: 'react-native-starter-dev',
  scheme: 'rnstarterdev',
  owner: 'ronas_it',
  version: '0.0.1',
  runtimeVersion: {
    policy: 'sdkVersion'
  },
  updates: {
    url: `https://u.expo.dev/${projectID.development}`
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
    bundleIdentifier: 'com.ronasit.rnstarter.dev',
    backgroundColor: '#000000',
    config: {
      usesNonExemptEncryption: false
    }
  },
  android: {
    versionCode: 1,
    package: 'com.ronasit.rnstarter.dev',
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
  //         authToken: 'your-sentry-token'
  //       }
  //     }
  //   ]
  // },
  // plugins: ['sentry-expo'],
  extra: defaultAppEnvConfig
};

module.exports = () => {
  const env = process.env.APP_ENV as AppEnv;
  let envExpoConfig: PartialDeep<AppExpoConfig> = {};

  switch (env) {
    case 'production':
      envExpoConfig = {
        name: 'RN Starter Prod',
        slug: 'react-native-starter-prod',
        scheme: 'rnstarter',
        updates: {
          url: `https://u.expo.dev/${projectID[env]}`
        },
        extra: {
          env: 'production',
          eas: { projectId: projectID[env] }
        }
      };
      break;
    case 'development':
    default:
      break;
  }

  return merge(defaultExpoConfig, envExpoConfig);
};
