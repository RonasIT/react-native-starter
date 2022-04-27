import { store } from '@store/store';
import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
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
import { userService } from '@shared/user';

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
    const listItems = component.getAllByTestId('user-item');
    expect(listItems).toHaveLength(userPaginationResponse.data.length);
  });

  it('should render more items after the list end reached', async () => {
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 200
        },
        contentSize: {
          height: 200,
          width: 100
        },
        layoutMeasurement: {
          height: 100,
          width: 100
        }
      }
    };
    const usersSearchSpy = jest.spyOn(userService, 'search');
    const list = component.getByTestId('users-list');
    fireEvent.scroll(list, eventData);

    await waitFor(() => {
      expect(usersSearchSpy).toHaveBeenCalledWith({ page: 2 });
    });
  });
});
