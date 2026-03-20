import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          //tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          //tabBarButton: HapticTab,
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Stack.Screen
          name="update"
          options={{
            title: 'Update',
            //tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
