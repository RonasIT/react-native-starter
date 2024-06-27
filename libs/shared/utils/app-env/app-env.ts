import Constants from 'expo-constants';
import { AppEnvName, AppExpoConfig } from 'app.config';
import { AppEnv } from './env';

export const appEnv = new AppEnv<AppEnvName>((Constants.expoConfig as AppExpoConfig)?.extra?.env);
