import ErrorBoundary from '@/components/ErrorBoundary';
import AuthProvider from '@/providers/AuthProviders';
import { NetworkProvider } from '@/providers/NetworkContext';
import { ToastProvider } from '@/providers/ToastProvider';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
    <>
      <ErrorBoundary>
        <NetworkProvider>
          <AuthProvider>
            <ToastProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
            </ToastProvider>
          </AuthProvider>
        </NetworkProvider>
      </ErrorBoundary>
    </>
  );
}

