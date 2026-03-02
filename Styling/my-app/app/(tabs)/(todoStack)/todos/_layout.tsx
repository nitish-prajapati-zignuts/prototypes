import { useAuth } from '@/store/AuthContext/AuthContext';
import { useAuthStore } from '@/zustand/useAuthStore';
import { Redirect, router, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function TodosStackLayout() {
  const { user } = useAuth();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isUserExists = !!user;

  useEffect(() => {
    if (!isUserExists) {
      router.replace('/');
    }
  }, [isUserExists]);

  if (!isUserExists) return null;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Protected guard={isAuthenticated}>
        {isAuthenticated === true ? (
          <Stack.Screen
            name="[id]"
            options={{ headerTitle: "Todo's" }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="NotAuthorize"
            options={{ headerTitle: "Todo's" }}
          ></Stack.Screen>
        )}
      </Stack.Protected>

      <Stack.Screen
        name="index"
        options={{ headerTitle: "Todo's" }}
      ></Stack.Screen>
    </Stack>
  );
}
