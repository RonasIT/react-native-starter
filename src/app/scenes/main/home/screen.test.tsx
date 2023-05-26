import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ReactTestInstance } from 'react-test-renderer';
import { Observable, of } from 'rxjs';
import { apiService } from '@libs/shared/data-access/api-client';
import { userPaginationResponse } from '@tests/fixtures';
import { TestRootComponent } from '@tests/helpers';
import { HomeScreen } from './screen';

describe('Home screen', () => {
  let component: RenderAPI;
  let usersList: ReactTestInstance;

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
    // TODO: change mock implementation
    jest.spyOn(apiService, 'get').mockImplementation((endpoint) => {
      if (endpoint === '/users') {
        return of(userPaginationResponse) as Observable<any>;
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

  // TODO: add tests for scrolling and refreshing
});
