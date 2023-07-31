import { NavigationContainerRef, NavigationState, Route } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<object>>();

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

  public get savedState(): NavigationState {
    return this._savedState;
  }

  private _savedState?: NavigationState;

  public saveCurrentState(options: { overwriteSaved: boolean } = { overwriteSaved: false }): void {
    if (!this._savedState || options.overwriteSaved) {
      this._savedState = this.currentState;
    }
  }

  public clearSavedState(): void {
    delete this._savedState;
  }

  public tryRestoreSavedState(): void {
    if (this._savedState) {
      this.resetToState(this._savedState);
    }
  }

  public goBack(): void {
    navigationRef.current?.goBack();
  }

  public resetToRoute(name: string, params: any = {}, index: number = 0): void {
    navigationRef.current?.reset({ index, routes: [{ name, params }] });
  }

  public resetToState(state: NavigationState): void {
    this.clearSavedState();

    navigationRef.current?.reset(state);
  }
}

export const appNavigationService = new AppNavigationService();
