import { Stack } from "expo-router";

export default function ProjectLayout() {
    return (
        <Stack>
            {/* For Getting All List here */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* For Adding New Project */}
            <Stack.Screen name="add-project" options={{ headerShown: false }} />
            {/* For Updating Project */}
            <Stack.Screen name="update-project" options={{ headerShown: false }} />
            {/* For Getting Single Project */}
            <Stack.Screen name="project-details" options={{ headerShown: false }} />
        </Stack>
    );
}