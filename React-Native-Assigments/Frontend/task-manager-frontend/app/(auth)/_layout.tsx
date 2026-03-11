import { useAuthStore } from "@/store/AuthStore";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function AuthLayout() {
    const token = useAuthStore((state) => state.token);
    const isAuthorized = useAuthStore((state) => state.isAuthorized);

    // If user already logged in → redirect
    if (token && isAuthorized) {
        return <Redirect href="/(protected)/projects" />;
    }

    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="register" />
            </Stack>

            <StatusBar style="auto" />
        </>
    );
}