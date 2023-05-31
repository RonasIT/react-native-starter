import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render, RenderAPI } from '@testing-library/react-native';
import { AxiosResponse } from 'axios';
import React from 'react';
import { Observable, of } from 'rxjs';
import { apiService } from '@libs/shared/data-access/api-client';
import { userPaginationResponse } from '@tests/fixtures';
import { TestRootComponent } from '@tests/helpers';
import { HomeScreen } from './screen';

describe('Home screen', () => {
  let component: RenderAPI;

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
  });

  it('should match the snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render list items', () => {
    const listItems = component.getAllByTestId('user-item');
    expect(listItems).toHaveLength(userPaginationResponse.data.length);
  });

  // TODO: add tests for scrolling and refreshing
});
