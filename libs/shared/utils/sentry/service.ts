import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';

export const sentryService: typeof Sentry.Native = Platform.OS === 'web' ? (Sentry as any).Browser : Sentry.Native;
