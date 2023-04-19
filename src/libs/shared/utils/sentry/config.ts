import { SentryExpoNativeOptions } from 'sentry-expo';
import { appEnv } from '@shared/utils/app-env';

// TODO: Demo configuration. Update in a real app
export const sentryConfig: SentryExpoNativeOptions = {
  enabled: true,
  dsn: 'https://your-sentry-dsn',
  environment: appEnv.current,
  enableInExpoDevelopment: false
};
