import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/state/auth';
import { CartProvider } from '@/state/cart';
import { LoadingProvider, useLoading } from '@/state/ui';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // Force light theme to avoid unintended dark UI while migrating styles
  return (
    <ThemeProvider value={DefaultTheme}>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <AuthGate />
            <GlobalLoadingOverlay />
            <StatusBar style="dark" />
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

function AuthGate() {
  const { user, loading } = useAuth();
  const [welcomeChecked, setWelcomeChecked] = useState(false);
  const [welcomeSeen, setWelcomeSeen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem('flash.welcome.seen');
        setWelcomeSeen(v === '1');
      } finally {
        setWelcomeChecked(true);
      }
    })();
  }, []);

  if (loading || !welcomeChecked) return null;
  return (
    <Stack>
      {user ? (
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      ) : !welcomeSeen ? (
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

function GlobalLoadingOverlay() {
  const { loading } = useLoading();
  return <LoadingOverlay visible={loading} />;
}
