import { authService } from '@shared/auth';
import { appNavigationService } from '@shared/navigation';
import { fireEvent, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { validCredentials } from '@tests/fixtures';
import { setDefaultLanguage, TestRootComponent } from '@tests/helpers';
import React from 'react';
import { ReactTestInstance } from 'react-test-renderer';
import { LoginScreen } from './screen';

describe('Login screen', () => {
  let component: RenderAPI;
  let emailInput: ReactTestInstance;
  let passwordInput: ReactTestInstance;
  let submitButton: ReactTestInstance;
  let translation: Record<string, any>;

  function initComponent(): RenderAPI {
    return render(
      <TestRootComponent>
        <LoginScreen />
      </TestRootComponent>
    );
  }

  beforeAll(() => {
    translation = setDefaultLanguage();
  });

  beforeEach(() => {
    component = initComponent();
    emailInput = component.getByTestId('email-input');
    passwordInput = component.getByTestId('password-input');
    submitButton = component.getByTestId('submit-button');
  });

  it('should match the snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have two text inputs', () => {
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('should have a submit button', () => {
    expect(submitButton).toBeDefined();
  });

  it('should render validation errors by submitting the empty form', async () => {
    fireEvent.press(submitButton);

    await waitFor(() => {
      const errors = component.getAllByTestId('validation-error');
      expect(errors[0].children[0]).toBe(translation.COMMON.VALIDATION.TEXT_VALIDATION_REQUIRED_FIELD);
      expect(errors[1].children[0]).toBe(translation.COMMON.VALIDATION.TEXT_VALIDATION_REQUIRED_FIELD);
    });
  });

  it('should render a validation error by submitting the form with invalid email', async () => {
    fireEvent.changeText(emailInput, '123');
    fireEvent.press(submitButton);

    await waitFor(() => {
      const error = component.getAllByTestId('validation-error')[0];
      expect(error.children[0]).toBe(translation.COMMON.VALIDATION.TEXT_VALIDATION_EMAIL);
    });
  });

  it('should init authorization with valid credentials and subscribe to push notifications', async () => {
    const demoAuthorizeSpy = jest.spyOn(authService, 'demoAuthorize');
    const navigateSpy = jest.spyOn(appNavigationService, 'resetToRoute');

    fireEvent.changeText(emailInput, validCredentials.email);
    fireEvent.changeText(passwordInput, validCredentials.password);
    fireEvent.press(submitButton);

    await waitFor(
      () => {
        expect(demoAuthorizeSpy).toHaveBeenCalledWith(validCredentials);
        expect(navigateSpy).toHaveBeenCalledWith('Main');
      },
      { timeout: 7000 }
    );
  });
});
