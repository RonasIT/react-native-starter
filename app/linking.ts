import { getStateFromPath, PathConfig } from '@react-navigation/native';
import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types';
import * as Linking from 'expo-linking';
import { AccountAccessNavigationParams } from '@app/account-access/navigation';
import { MainNavigationParams } from '@app/main/navigation';

type ScreenLinkingOptions = Parameters<typeof getStateFromPath>[1];
type ScreenRoutingOptions<T extends object> = {
  [key in keyof T]?: string | ScreenLinkingOptions | PathConfig<object>;
};

const appLink = Linking.createURL('/');

export const appLinking: LinkingOptions<object> = {
  prefixes: [appLink],
  config: {
    screens: {
      AccountAccess: {
        initialRouteName: 'Login',
        screens: <ScreenRoutingOptions<AccountAccessNavigationParams>>{
          Login: 'login'
        }
      },
      Main: {
        initialRouteName: 'Home',
        screens: <ScreenRoutingOptions<MainNavigationParams>>{
          HomeNavigation: 'tab-one',
          Profile: 'tab-two'
        }
      }
    }
  }
};