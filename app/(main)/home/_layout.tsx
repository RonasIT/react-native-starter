import { Stack } from 'expo-router/stack';
import React, { ReactElement } from 'react';

export default function HomeLayout(): ReactElement {
  return <Stack screenOptions={{ headerShown: false }} />;
}
