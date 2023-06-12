import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { AxiosResponse } from 'axios';
import React from 'react';
import { act, ReactTestInstance } from 'react-test-renderer';
import { Observable, of } from 'rxjs';
import { apiService } from '@libs/shared/data-access/api-client';
import { navigationRef } from '@libs/shared/features/navigation';
import { userPaginationResponse } from '@tests/fixtures';
import { scrollDownEventData, TestRootComponent } from '@tests/helpers';
import { HomeScreen } from './screen';
import SpyInstance = jest.SpyInstance;

describe('Home screen', () => {
  let component: RenderAPI;
  let usersList: ReactTestInstance;
  let createUserButton: ReactTestInstance;
  let navigateSpy: SpyInstance;
  const searchUsersSpy = jest.spyOn(apiService.httpClient, 'request');

  function initComponent(): RenderAPI {
    const { Screen, Navigator } = createStackNavigator();

    return render(
      <TestRootComponent>
        <NavigationContainer ref={navigationRef}>
          <Navigator>
            <Screen name='Home' component={HomeScreen} />
          </Navigator>
        </NavigationContainer>
      </TestRootComponent>
    );
  }

  beforeAll(() => {
    jest.spyOn(apiService.httpClient, 'request').mockImplementation((config) => {
      if (config.method === 'get' && config.url === '/users') {
        return of({ data: userPaginationResponse }) as Observable<AxiosResponse>;
      }
    });
  });

  beforeEach(() => {
    component = initComponent();
    usersList = component.getByTestId('users-list');
    createUserButton = component.getByTestId('create-user-button');
    navigateSpy = jest.spyOn(navigationRef.current, 'navigate');
  });

  it('should match the snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render list items', () => {
    const listItems = component.getAllByTestId('user-item');
    expect(listItems).toHaveLength(userPaginationResponse.data.length);
  });

  it('should render the button "Create user"', () => {
    expect(createUserButton).toBeDefined();
  });

  it('should load more items after the list end reached', async () => {
    fireEvent.scroll(usersList, scrollDownEventData);

    await waitFor(() => {
      expect(searchUsersSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'get',
          url: '/users',
          params: { page: 2 }
        })
      );
    });
  });

  it('should load the first page of users on the list refresh', async () => {
    const { refreshControl } = usersList.props;
    act(() => {
      refreshControl.props.onRefresh();
    });

    await waitFor(() => {
      expect(searchUsersSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'get',
          url: '/users',
          params: { page: 1 }
        })
      );
    });
  });

  it('should navigate to empty user page by pressing the button "Create user"', async () => {
    fireEvent.press(createUserButton);

    expect(navigateSpy).toHaveBeenCalledWith('User');
  });

  it('should navigate to user page by pressing an item', async () => {
    const listItems = component.getAllByTestId('user-item');
    const itemIndex = Math.floor(Math.random() * listItems.length);
    fireEvent.press(listItems[itemIndex]);

    expect(navigateSpy).toHaveBeenCalledWith('User', { id: userPaginationResponse.data[itemIndex].id });
  });
});
