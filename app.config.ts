import { ExpoConfig } from '@expo/config';
import { merge } from 'lodash';
import { PartialDeep } from 'type-fest';

type AppEnv = 'development' | 'production';

export const appEnvConfig = {
  env: 'development' as AppEnv
};

const defaultExpoConfig: ExpoConfig = {
  name: 'RN Starter Dev',
  slug: 'react-native-starter-dev',
  scheme: 'rnstarterdev',
  owner: 'ronas_it',
  entryPoint: 'index.js',
  version: '0.0.1',
  orientation: 'portrait',
  backgroundColor: '#000000',
  icon: './src/assets/images/icon.png',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000'
  },
  assetBundlePatterns: ['./src/assets/images/*', './src/assets/fonts/*', './src/assets/i18n/*'],
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
  extra: appEnvConfig
};

type PartialConfig = PartialDeep<ExpoConfig & { extra: typeof appEnvConfig }>;

module.exports = () => {
  const env = process.env.APP_ENV as AppEnv;

  if (env === 'production') {
    return merge(defaultExpoConfig, <PartialConfig>{
      name: 'RN Starter Prod',
      slug: 'react-native-starter-prod',
      scheme: 'rnstarter',
      extra: {
        env: 'production'
      }
    });
  } else {
    return defaultExpoConfig;
  }
};
