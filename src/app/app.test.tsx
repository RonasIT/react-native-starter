import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '@store';
import React from 'react';
import { App } from './app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactTestInstance } from 'react-test-renderer';

jest.mock('react-native-safe-area-context', () => {
  const actualContext = jest.requireActual('react-native-safe-area-context');

  return {
    ...actualContext,
    useSafeAreaInsets: jest.fn().mockReturnValue({ top: 0, left: 0, right: 0, bottom: 0 })
  };
});

describe('App', () => {
  let component: RenderAPI;
  let tabBarItems: Array<ReactTestInstance>;

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
  });

  beforeEach(async () => {
    component = initComponent();

    await waitFor(() => {
      tabBarItems = component.getAllByTestId('tab-bar-item');
    });
  });

  it('should render two tab bar items', async () => {
    expect(tabBarItems).toHaveLength(2);
  });

  it('should navigate to Profile and Home screens by press on the tab bar items', async () => {
    fireEvent.press(tabBarItems[1]);

    const profileScreen = component.getByTestId('profile-screen');
    expect(profileScreen).not.toBeNull();

    fireEvent.press(tabBarItems[0]);

    const homeScreen = component.getByTestId('home-screen');
    expect(homeScreen).not.toBeNull();
  });
});
