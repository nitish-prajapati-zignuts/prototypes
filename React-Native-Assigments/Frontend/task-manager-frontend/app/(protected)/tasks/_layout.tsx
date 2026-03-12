import AuthProvider from "@/providers/AuthProviders";
import { responsiveSize } from "@/styles/AuthStyles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function TasksLayout() {
    return (
        <AuthProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack>

                    {/* TASK LIST */}
                    <Stack.Screen
                        name="index"
                        options={{
                            title: "Tasks",
                            headerTitleAlign: "center",
                            headerBackButtonDisplayMode: "default",
                            headerShown: false
                        }}
                    />

                    {/* CREATE TASK */}
                    <Stack.Screen
                        name="create-task"
                        options={{
                            title: "",
                            headerBackButtonDisplayMode: "default"
                        }}
                    />

                    {/* UPDATE TASK */}
                    <Stack.Screen
                        name="update-task"
                        options={{
                            title: "",
                            headerBackButtonDisplayMode: "default"
                        }}
                    />

                </Stack>
            </SafeAreaView>
        </AuthProvider>
    );
}