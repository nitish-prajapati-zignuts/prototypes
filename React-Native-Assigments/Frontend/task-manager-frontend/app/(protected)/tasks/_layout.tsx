import { Colors } from "@/constants/Colors";
import AuthProvider from "@/providers/AuthProviders";
import { responsiveSize } from "@/styles/AuthStyles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function TasksLayout() {
    return (
        <AuthProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <Stack>

                    <Stack.Screen
                        name="index"
                        options={{
                            title: "Tasks",
                            headerTitleAlign: "center",
                            headerBackButtonDisplayMode: "default",
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name="create-task"
                        options={{
                            title: "",
                            headerShown: false,
                            headerBackButtonDisplayMode: "default"
                        }}
                    />

                    <Stack.Screen
                        name="update-task"
                        options={{
                            title: "",
                            headerShown: false,
                            headerBackButtonDisplayMode: "default"
                        }}
                    />

                </Stack>
            </SafeAreaView>
        </AuthProvider>
    );
}