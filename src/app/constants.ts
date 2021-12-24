import Constants from 'expo-constants';
import { defaultAppConfig } from '../../app.config';

export const appConfig = Constants.manifest.extra as typeof defaultAppConfig;
