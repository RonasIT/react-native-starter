import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { AxiosResponse } from 'axios';
import React from 'react';
import { ReactTestInstance } from 'react-test-renderer';
import { Observable, of } from 'rxjs';
import UserScreen from '@app/(main)/home/user';
import { apiService } from '@libs/shared/data-access/api-client';
import { user, userEntityResponse } from '@tests/fixtures';
import { setDefaultLanguage, TestRootComponent } from '@tests/helpers';

import SpyInstance = jest.SpyInstance;

describe('User screen', () => {
  let component: RenderAPI;
  let title: ReactTestInstance;
  let saveButton: ReactTestInstance;
  let emailInput: ReactTestInstance;
  let nameInput: ReactTestInstance;
  let genderInput: ReactTestInstance;
  let statusInput: ReactTestInstance;
  let translation: Record<string, any>;
  let requestSpy: SpyInstance;

  //TODO fix tests for Expo Router

  function initComponent(/* userID?: number */): RenderAPI {
    return render(
      <TestRootComponent>
        <UserScreen
        /* route={{
            name: 'User',
            key: 'User',
            params: { id: userID }
          }} */
        />
      </TestRootComponent>
    );
  }

  function getComponentElements(component: RenderAPI): void {
    title = component.getByTestId('title');
    emailInput = component.getByTestId('email-input');
    nameInput = component.getByTestId('name-input');
    genderInput = component.getByTestId('gender-input');
    statusInput = component.getByTestId('status-input');
    saveButton = component.getByTestId('save-button');
  }

  beforeAll(() => {
    requestSpy = jest.spyOn(apiService.httpClient, 'request').mockImplementation((config) => {
      if (config.url && config.url.includes('/users') && config.method !== 'delete') {
        return of({ data: userEntityResponse }) as Observable<AxiosResponse<unknown>>;
      }

      return of({} as AxiosResponse<unknown>);
    });
    translation = setDefaultLanguage();
  });

  describe('without params', () => {
    beforeEach(() => {
      component = initComponent();
      getComponentElements(component);
    });

    it('should match the snapshot', () => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render the title with the correct text', () => {
      expect(title).toHaveTextContent(translation.USERS.DETAILS.TEXT_CREATE);
    });

    it('should render four empty text inputs', () => {
      expect(emailInput).toHaveProp('value', '');
      expect(nameInput).toHaveProp('value', '');
      expect(genderInput).toHaveProp('value', null);
      expect(statusInput).toHaveProp('value', null);
    });

    it('should render the button "Save"', () => {
      expect(saveButton).toBeVisible();
    });

    it('should render validation errors by submitting the empty form', async () => {
      const testIDs = ['email-input', 'name-input', 'gender-input', 'status-input'];
      fireEvent.press(saveButton);

      await waitFor(() => {
        for (const testID of testIDs) {
          const error = component.getByTestId(`${testID}.validationMessage`);
          expect(error).toHaveTextContent(translation.USERS.VALIDATION.TEXT_VALIDATION_REQUIRED_FIELD);
        }
      });
    });

    it('should render a validation error by submitting the form with an invalid email', async () => {
      fireEvent.changeText(emailInput, '123');
      fireEvent.press(saveButton);

      await waitFor(() => {
        const error = component.getByTestId('email-input.validationMessage');
        expect(error).toHaveTextContent(translation.USERS.VALIDATION.TEXT_VALIDATION_EMAIL);
      });
    });

    it('should render a validation error by submitting the form with an invalid gender', async () => {
      fireEvent.changeText(genderInput, '123');
      fireEvent.press(saveButton);

      await waitFor(() => {
        const error = component.getByTestId('gender-input.validationMessage');
        expect(error).toHaveTextContent(translation.USERS.VALIDATION.TEXT_VALIDATION_INVALID);
      });
    });

    it('should render a validation error by submitting the form with an invalid status', async () => {
      fireEvent.changeText(statusInput, '123');
      fireEvent.press(saveButton);

      await waitFor(() => {
        const error = component.getByTestId('status-input.validationMessage');
        expect(error).toHaveTextContent(translation.USERS.VALIDATION.TEXT_VALIDATION_INVALID);
      });
    });

    it('should create a user and show a success message by submitting the valid form', async () => {
      const { email, name, gender, status } = user;

      fireEvent.changeText(emailInput, email);
      fireEvent.changeText(nameInput, name);
      fireEvent.changeText(genderInput, gender);
      fireEvent.changeText(statusInput, status);
      fireEvent.press(saveButton);

      await waitFor(() => {
        const successMessage = component.getByTestId('success-message');
        expect(successMessage).toBeVisible();
        expect(requestSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'post',
            url: '/users',
            data: expect.objectContaining({ email, name, gender, status })
          })
        );
      });
    });
  });

  describe('with params', () => {
    let deleteButton: ReactTestInstance;

    beforeEach(async () => {
      await waitFor(() => {
        component = initComponent(/* user.id */);
      });
      getComponentElements(component);
      deleteButton = component.getByTestId('delete-button');
    });

    it('should match the snapshot', () => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render the title with the correct text', () => {
      expect(title).toHaveTextContent(translation.USERS.DETAILS.TEXT_EDIT);
    });

    it('should load a user and fill the text inputs', () => {
      expect(requestSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'get',
          url: `/users/${user.id}`
        })
      );
      expect(emailInput).toHaveProp('value', user.email);
      expect(nameInput).toHaveProp('value', user.name);
      expect(genderInput).toHaveProp('value', user.gender);
      expect(statusInput).toHaveProp('value', user.status);
    });

    it('should render the "Save" and "Delete" buttons', () => {
      expect(saveButton).toBeVisible();
      expect(deleteButton).toBeVisible();
    });

    it('should update the user and show a success message by submitting the valid form', async () => {
      const { email, name, gender, status } = user;

      fireEvent.changeText(emailInput, email);
      fireEvent.changeText(nameInput, name);
      fireEvent.changeText(genderInput, gender);
      fireEvent.changeText(statusInput, status);
      fireEvent.press(saveButton);

      await waitFor(() => {
        const successMessage = component.getByTestId('success-message');
        expect(successMessage).toBeVisible();
        expect(requestSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'put',
            url: `/users/${user.id}`,
            data: expect.objectContaining({ email, name, gender, status })
          })
        );
      });
    });

    it('should delete the user by pressing the "Delete" button', async () => {
      fireEvent.press(deleteButton);

      await waitFor(() => {
        expect(requestSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'delete',
            url: `/users/${user.id}`
          })
        );
      });
    });
  });
});
