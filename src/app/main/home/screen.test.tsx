import { store } from '@store/store';
import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { userPaginationResponse } from '@tests/fixtures';
import { safeAreaProviderMetrics, scrollDownEventData, scrollUpEventData } from '@tests/helpers';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { HomeScreen } from './screen';
import { apiService } from '@shared/api';
import { of } from 'rxjs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { userService } from '@shared/user';
import { ReactTestInstance } from 'react-test-renderer';

describe('Home screen', () => {
  let component: RenderAPI;
  let usersList: ReactTestInstance;
  const searchUsersSpy = jest.spyOn(userService, 'search');

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
    usersList = component.getByTestId('users-list');
  });

  it('should match the snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render list items', () => {
    const listItems = component.getAllByTestId('user-item');
    expect(listItems).toHaveLength(userPaginationResponse.data.length);
  });

  it('should load more items after the list end reached', async () => {
    fireEvent.scroll(usersList, scrollDownEventData);

    await waitFor(() => {
      expect(searchUsersSpy).toHaveBeenCalledWith({ page: 2 });
    });
  });

  it('should load the first page of users on the list refresh ', async () => {
    fireEvent.scroll(usersList, scrollUpEventData);

    await waitFor(() => {
      expect(searchUsersSpy).toHaveBeenCalledWith({});
    });
  });
});
