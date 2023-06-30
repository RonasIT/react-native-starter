import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { AxiosResponse } from 'axios';
import React, { ReactElement } from 'react';
import { measurePerformance } from 'reassure';
import { Observable, of } from 'rxjs';
import { apiService } from '@libs/shared/data-access/api-client';
import { user, userEntityResponse } from '@tests/fixtures';
import { TestRootComponent } from '@tests/helpers';
import { UserScreen } from './screen';

describe('User screen', () => {
  function initComponent(userID?: number): ReactElement {
    return (
      <TestRootComponent>
        <UserScreen
          route={{
            name: 'User',
            key: 'User',
            params: { id: userID }
          }}
        />
      </TestRootComponent>
    );
  }

  const submitValidFormScenario = async (): Promise<void> => {
    const { email, name, gender, status } = user;

    fireEvent.changeText(screen.getByTestId('email-input'), email);
    fireEvent.changeText(screen.getByTestId('name-input'), name);
    fireEvent.changeText(screen.getByTestId('gender-input'), gender);
    fireEvent.changeText(screen.getByTestId('status-input'), status);
    fireEvent.press(screen.getByTestId('save-button'));

    await waitFor(async () => {
      await screen.findByTestId('success-message');
    });
  };

  beforeAll(() => {
    jest.spyOn(apiService.httpClient, 'request').mockImplementation((config) => {
      if (config.url.includes('/users') && config.method !== 'delete') {
        return of({ data: userEntityResponse }) as Observable<AxiosResponse>;
      }
    });
  });

  it('initial render without params', async () => {
    await measurePerformance(initComponent());
  });

  it('submit empty fields', async () => {
    const scenario = async (): Promise<void> => {
      const inputsTestIDs = ['email-input', 'name-input', 'gender-input', 'status-input'];
      fireEvent.press(screen.getByTestId('save-button'));

      await waitFor(async () => {
        for (const testID of inputsTestIDs) {
          await screen.findByTestId(`${testID}.validationMessage`);
        }
      });
    };

    await measurePerformance(initComponent(), { scenario });
  });

  // Fails
  /*  it('submit valid form to create a user', async () => {
    await measurePerformance(initComponent(), { scenario: submitValidFormScenario });
  });*/

  it('initial render with params', async () => {
    const scenario = async (): Promise<void> => {
      await waitFor(() => {
        expect(screen.getByTestId('email-input')).toHaveProp('value', user.email);
        expect(screen.getByTestId('name-input')).toHaveProp('value', user.name);
        expect(screen.getByTestId('gender-input')).toHaveProp('value', user.gender);
        expect(screen.getByTestId('status-input')).toHaveProp('value', user.status);
      });
    };

    await measurePerformance(initComponent(user.id), { scenario });
  });

  it('submit valid form to update a user', async () => {
    await measurePerformance(initComponent(user.id), { scenario: submitValidFormScenario });
  });

  it('delete user', async () => {
    const scenario = async (): Promise<void> => {
      const requestSpy = jest.spyOn(apiService.httpClient, 'request');
      fireEvent.press(screen.getByTestId('delete-button'));

      await waitFor(() => {
        expect(requestSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'delete',
            url: `/users/${user.id}`
          })
        );
      });
    };

    await measurePerformance(initComponent(user.id), { scenario });
  });
});
