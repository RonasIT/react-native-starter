import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { AxiosResponse } from 'axios';
import React, { ReactElement } from 'react';
import { act } from 'react-test-renderer';
import { measurePerformance } from 'reassure';
import { Observable, of } from 'rxjs';
import { apiService } from '@libs/shared/data-access/api-client';
import { userPaginationResponse } from '@tests/fixtures';
import { scrollDownEventData, TestRootComponent } from '@tests/helpers';
import { HomeScreen } from './screen';

describe('Home screen', () => {
  function initComponent(): ReactElement {
    const { Screen, Navigator } = createStackNavigator();

    return (
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

  it('initial render', async () => {
    await measurePerformance(initComponent());
  });

  it('refresh', async () => {
    const scenario = async (): Promise<void> => {
      const usersList = screen.getByTestId('users-list');
      const { refreshControl } = usersList.props;
      act(() => {
        refreshControl.props.onRefresh();
      });

      await waitFor(async () => {
        await screen.findAllByTestId('user-item');
      });
    };

    await measurePerformance(initComponent(), { scenario });
  });

  it('scroll', async () => {
    const scenario = async (): Promise<void> => {
      const usersList = screen.getByTestId('users-list');
      fireEvent.scroll(usersList, scrollDownEventData);

      await waitFor(async () => {
        await screen.findAllByTestId('user-item');
      });
    };

    await measurePerformance(initComponent(), { scenario });
  });
});
