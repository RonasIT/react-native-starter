import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import React, { ReactElement } from 'react';

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);

      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }

      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);

      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  }
};

export function AppClerkProvider({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_ZmFpci1jaGlja2VuLTk2LmNsZXJrLmFjY291bnRzLmRldiQ'}>
      {children}
    </ClerkProvider>
  );
}
