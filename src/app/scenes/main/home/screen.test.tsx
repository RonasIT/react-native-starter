import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { AxiosResponse } from 'axios';
import React from 'react';
import { act, ReactTestInstance } from 'react-test-renderer';
import { Observable, of } from 'rxjs';
import { apiService } from '@libs/shared/data-access/api-client';
import { userPaginationResponse } from '@tests/fixtures';
import { scrollDownEventData, TestRootComponent } from '@tests/helpers';
import { HomeScreen } from './screen';

describe('Home screen', () => {
  let component: RenderAPI;
  let usersList: ReactTestInstance;
  const searchUsersSpy = jest.spyOn(apiService.httpClient, 'request');

  function initComponent(): RenderAPI {
    const { Screen, Navigator } = createStackNavigator();

    return render(
      <TestRootComponent>
        <NavigationContainer>
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
      expect(searchUsersSpy).toHaveBeenCalledWith({
        method: 'get',
        url: '/users',
        params: { page: 2 },
        headers: {}
      });
    });
  });

  it('should load the first page of users on the list refresh ', async () => {
    const { refreshControl } = usersList.props;
    act(() => {
      refreshControl.props.onRefresh();
    });

    await waitFor(() => {
      expect(searchUsersSpy).toHaveBeenCalledWith({
        method: 'get',
        url: '/users',
        params: { page: 1 },
        headers: {}
      });
    });
  });
});
