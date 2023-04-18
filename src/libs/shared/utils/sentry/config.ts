import { SentryExpoNativeOptions } from 'sentry-expo';
import { appEnv } from '../app-env';

export const sentryConfig: SentryExpoNativeOptions = {
  enabled: true,
  dsn: 'https://your-sentry-dsn',
  environment: appEnv.current,
  enableInExpoDevelopment: false
};
