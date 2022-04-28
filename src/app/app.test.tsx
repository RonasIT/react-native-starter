import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '@store';
import React from 'react';
import { App } from './app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '@shared/api';
import { of } from 'rxjs';
import { userPaginationResponse } from '@tests/fixtures';
import { profileService } from '@shared/profile';
import { plainToInstance } from 'class-transformer';
import { User } from '@shared/user';

jest.mock('react-native-safe-area-context', () => {
  const actualContext = jest.requireActual('react-native-safe-area-context');

  return {
    ...actualContext,
    useSafeAreaInsets: jest.fn().mockReturnValue({ top: 0, left: 0, right: 0, bottom: 0 })
  };
});

describe('App', () => {
  let component: RenderAPI;

  function initComponent(): RenderAPI {
    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

  beforeAll(() => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation((key) => {
      if (key === 'token') {
        return Promise.resolve('some-demo-token');
      }
    });
    jest
      .spyOn(profileService, 'getDemoProfile')
      .mockReturnValue(of(plainToInstance(User, userPaginationResponse.data[0])));
    jest.spyOn(apiService, 'get').mockImplementation((endpoint) => {
      if (endpoint === '/users') {
        return of(userPaginationResponse) as any;
      }
    });
  });

  beforeEach(() => {
    component = initComponent();
  });

  it('should render two tab bar items', async () => {
    await waitFor(() => {
      const tabBarItems = component.queryAllByTestId('tab-bar-item');
      expect(tabBarItems).toHaveLength(2);
    });
  });
});
