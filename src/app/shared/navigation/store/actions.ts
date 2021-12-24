import { NavigationState } from '@react-navigation/native';
import { action, actionWithPayload } from '@store/action-factory';

export class AppNavigationActions {
  public static saveInterruptedNavigation = actionWithPayload<{ navigationState: NavigationState }>(
    '[AppNavigation] Save interrupted navigation'
  );
  public static clearInterruptedNavigation = action(
    '[AppNavigation] Clear interrupted navigation'
  );
}
