module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '@libs': './libs',
            '@i18n': './i18n',
            '@assets': './assets',
            '@tests': './tests',
            '@app': './app'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
