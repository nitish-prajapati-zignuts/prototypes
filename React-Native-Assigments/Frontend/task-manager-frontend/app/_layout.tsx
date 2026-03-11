import AuthProvider from '@/providers/AuthProviders';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
    <>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />


          {/* <Stack.Screen name="(auth)/register" options={{ title: 'Register' }} /> */}
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}
