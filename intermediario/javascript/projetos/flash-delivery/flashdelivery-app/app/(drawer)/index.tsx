import React from 'react';
import { Redirect } from 'expo-router';

export default function DrawerHome() {
  // Redirect drawer home to the tabs group
  return <Redirect href="/(drawer)/(tabs)" />;
}
