import { appEnv } from '@libs/shared/utils/app-env';
import { SentryExpoNativeOptions } from 'sentry-expo';

// TODO: Demo configuration. Update in a real app
export const sentryConfig: SentryExpoNativeOptions = {
  enabled: true,
  dsn: 'https://your-sentry-dsn',
  environment: appEnv.current,
  enableInExpoDevelopment: false
};
