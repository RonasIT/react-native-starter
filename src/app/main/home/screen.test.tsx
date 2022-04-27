import { store } from '@store/store';
import { render, RenderAPI } from '@testing-library/react-native';
import { userPaginationResponse } from '@tests/fixtures';
import { safeAreaProviderMetrics } from '@tests/helpers';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { HomeScreen } from './screen';
import { apiService } from '@shared/api';
import { of } from 'rxjs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

describe('Home screen', () => {
  let component: RenderAPI;

  function initComponent(): RenderAPI {
    const { Screen, Navigator } = createStackNavigator();

    return render(
      <Provider store={store}>
        <SafeAreaProvider initialMetrics={safeAreaProviderMetrics}>
          <NavigationContainer>
            <Navigator>
              <Screen name='Home' component={HomeScreen} />
            </Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }

  beforeAll(() => {
    jest.spyOn(apiService, 'get').mockImplementation((endpoint) => {
      if (endpoint === '/users') {
        return of(userPaginationResponse) as any;
      }
    });
  });

  beforeEach(() => {
    component = initComponent();
  });

  it('should render list items', () => {
    const listItems = component.getAllByTestId('home-list-item');
    expect(listItems).toHaveLength(userPaginationResponse.data.length);
  });
});
