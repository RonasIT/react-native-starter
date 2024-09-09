import React from 'react';
import { ClerkEmailOtpSignIn } from '@libs/auth/features/clerk-email-otp-sign-in';
import { ClerkEmailOtpSignUp } from '@libs/auth/features/clerk-email-otp-sign-up';
import { SignInWithOAuth } from '@libs/auth/features/clerk-oath/component';
import { ClerkPhoneOtpSignIn } from '@libs/auth/features/clerk-phone-otp-sign-in';
import { ClerkPhoneOtpSignUp } from '@libs/auth/features/clerk-phone-otp-sign-up';
import { ClerkUsernameSignIn } from '@libs/auth/features/clerk-username-sign-in';
import { ClerkUsernameSignUp } from '@libs/auth/features/clerk-username-sign-up';
import { commonStyle } from '@libs/shared/ui/styles';
import { AppScreen } from '@libs/shared/ui/ui-kit/screen';

export default function LoginScreen(): JSX.Element {
  return (
    <AppScreen style={commonStyle.container}>
      <ClerkUsernameSignUp />
      <ClerkUsernameSignIn />
      <ClerkEmailOtpSignUp />
      <ClerkEmailOtpSignIn />
      <ClerkPhoneOtpSignUp />
      <ClerkPhoneOtpSignIn />
      <SignInWithOAuth />
    </AppScreen>
  );
}
