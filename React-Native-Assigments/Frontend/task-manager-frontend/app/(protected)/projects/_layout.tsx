import AuthProvider from "@/providers/AuthProviders";
import { Stack } from "expo-router";

export default function ProjectLayout() {
  return (
    <AuthProvider>
      <Stack>
        {/* Project List */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Projects",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "#111827" },
          }}
        />

        {/* Add Project Screen */}
        <Stack.Screen
          name="add-project"
          options={{
            title: "Add Project",
            headerBackButtonDisplayMode: "default",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "#111827" },
          }}
        />

        {/* Update Project Screen */}
        <Stack.Screen
          name="update-project"
          options={{
            title: "Update Project",
            headerBackButtonDisplayMode: "default",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "#111827" },
          }}
        />

        {/* Project Details */}
        <Stack.Screen
          name="project-details"
          options={{
            title: "Project Details",
            headerBackButtonDisplayMode: "default",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "#111827" },
          }}
        />
      </Stack>
    </AuthProvider>
  );
}