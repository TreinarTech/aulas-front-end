import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/state/auth';
import { CartProvider } from '@/state/cart';

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
      <AuthProvider>
        <CartProvider>
          <AuthGate />
          <StatusBar style="dark" />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AuthGate() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return (
    <Stack>
      {user ? (
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
