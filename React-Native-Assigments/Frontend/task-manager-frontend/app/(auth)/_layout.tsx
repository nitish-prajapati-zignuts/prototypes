import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name='register' options={{ headerShown: false }} />
                {/* <Stack.Screen name="(auth)/register" options={{ title: 'Register' }} /> */}
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
