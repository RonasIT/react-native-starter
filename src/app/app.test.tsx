import * as SecureStore from 'expo-secure-store';
import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { TestRootComponent } from '@tests/helpers';
import React from 'react';
import { ReactTestInstance } from 'react-test-renderer';
import { App } from './app';

describe('App', () => {
  let component: RenderAPI;
  let tabBarItems: Array<ReactTestInstance>;

  function initComponent(): RenderAPI {
    return render(
      <TestRootComponent>
        <App />
      </TestRootComponent>
    );
  }

  beforeAll(() => {
    jest.spyOn(SecureStore, 'getItemAsync').mockImplementation((key) => {
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
