import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient } from '@/lib/queryClient';
import { store } from '@/stores';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Toaster } from "expo-sonner";
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>

        <Toaster position='top-right' richColors />
        <StatusBar style="auto" />
      </Provider>
    </>
  );
}
