import { NavigationContainerRef, NavigationState, Route } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<{}>>();

class AppNavigationService {
  public get currentRoute(): Route<string> | undefined {
    return navigationRef.current?.getCurrentRoute();
  }

  public get currentState(): NavigationState | undefined {
    return navigationRef.current?.getRootState();
  }

  public get canGoBack(): boolean {
    return navigationRef.current?.canGoBack();
  }

  public get navigate(): NavigationContainerRef<any>['navigate'] {
    return navigationRef.current?.navigate;
  }

  public goBack(): void {
    navigationRef.current?.goBack();
  }

  public resetToRoute(name: string, params: any = {}, index: number = 0): void {
    navigationRef.current?.reset({ index, routes: [{ name, params }] });
  }

  public resetToState(state: NavigationState): void {
    navigationRef.current?.reset(state);
  }
}

export const appNavigationService = new AppNavigationService();
