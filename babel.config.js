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
            '@libs': './src/libs',
            '@i18n': './src/i18n',
            '@assets': './src/assets',
            '@tests': './src/tests',
            '@app': './src/app'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
