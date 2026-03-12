import { Stack, router } from "expo-router";
import { Pressable, Text } from "react-native";

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                title: "Profile",
                headerBackButtonDisplayMode: "default"
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
}