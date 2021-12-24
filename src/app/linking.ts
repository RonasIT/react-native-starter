import { PrivateNavigationParams } from '@app/private/navigation';
import { getStateFromPath, PathConfig } from '@react-navigation/native';
import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types';
import * as Linking from 'expo-linking';
import { PublicNavigationParams } from './public/navigation';

type ScreenLinkingOptions = Parameters<typeof getStateFromPath>[1];
type ScreenRoutingOptions<T extends object> = {
  [key in keyof T]?: string | ScreenLinkingOptions | PathConfig<object>;
};

const appLink = Linking.makeUrl('/');

export const appLinking: LinkingOptions<object> = {
  prefixes: [appLink],
  config: {
    screens: {
      Public: {
        initialRouteName: 'Login',
        screens: <ScreenRoutingOptions<PublicNavigationParams>>{
          Login: 'login'
        }
      },
      Private: {
        initialRouteName: 'Main',
        screens: <ScreenRoutingOptions<PrivateNavigationParams>>{
          Home: 'tab-one',
          Profile: 'tab-two'
        }
      }
    }
  }
};
