import { ExpoConfig } from '@expo/config';
import { merge } from 'lodash';
import { PartialDeep } from 'type-fest';

export const defaultAppConfig = {
  production: false,
  sentry: {
    dsn: 'https://5e6a12477b794063b327b170426114b9@sentry.ronasit.com/125'
  },
  api: {
    root: 'https://dev.api.lainappi.ronasit.com/',
    unauthorizedEndpoints: ['login'],
    refreshTokenEndpoint: 'auth/refresh'
  }
};

const defaultExpoConfig: ExpoConfig = {
  name: 'RN Starter Dev',
  slug: 'react-native-starter-dev',
  scheme: 'rnstarterdev',
  owner: 'ronas_it',
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
    bundleIdentifier: 'com.ronasit.rnstarter',
    backgroundColor: '#000000',
    config: {
      usesNonExemptEncryption: false
    }
  },
  android: {
    versionCode: 1,
    package: 'com.ronasit.rnstarter',
    permissions: []
  },
  web: {
    favicon: './src/assets/images/favicon.png'
  },
  packagerOpts: {
    config: 'metro.config.js',
    sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json', 'wasm', 'svg']
  },
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          url: 'https://sentry.ronasit.com',
          organization: 'sentry',
          project: 'your-sentry-project-here',
          authToken: 'dcbd7a4a79554b4d8e992d951e2fbc00e14ec29c122744ceba46f289fe9a02bf'
        }
      }
    ]
  },
  plugins: ['sentry-expo'],
  extra: defaultAppConfig
};

type PartialConfig = PartialDeep<ExpoConfig & { extra: typeof defaultAppConfig }>;

module.exports = () => {
  const env = process.env.APP_ENV;

  if (env === 'production') {
    return merge(defaultExpoConfig, <PartialConfig>{
      name: 'RN Starter Prod',
      slug: 'react-native-starter-dev-prod',
      scheme: 'rnstarter',
      extra: {
        production: true
      }
    });
  } else {
    return {
      ...defaultExpoConfig,
      extra: defaultAppConfig
    };
  }
};
