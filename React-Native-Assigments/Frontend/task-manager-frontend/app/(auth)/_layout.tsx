import { ToastProvider } from "@/providers/ToastProvider";
import { useAuthStore } from "@/store/AuthStore";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

export default function AuthLayout() {
    const token = useAuthStore((state) => state.token);
    const isAuthorized = useAuthStore((state) => state.isAuthorized);
    const isHydrated = useAuthStore((state) => state.isHydrated);

    if (!isHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    if (token && isAuthorized) {
        return <Redirect href="/(protected)/projects" />;
    }

    return (
        <ToastProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="register" />
            </Stack>

            <StatusBar style="auto" />
        </ToastProvider>
    );
}