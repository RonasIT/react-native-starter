import { NavigationState } from '@react-navigation/native';

export class AppNavigationState {
  public interruptedNavigation: NavigationState;

  constructor() {
    this.interruptedNavigation = null;
  }
}
