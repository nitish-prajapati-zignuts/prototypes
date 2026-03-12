import { AuthStyles } from "@/styles/AuthStyles";
import { router } from "expo-router";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { authApi } from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/AuthStore";
import { useToast } from "@/providers/ToastProvider";
import { useEffect, useState } from "react";

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const setTokenFromBackend = useAuthStore((state) => state.setToken)
    const { showToast } = useToast()


    const onSubmit = async (data: FormData) => {
        console.log("Login Data:", data);
        const response = await authApi.post("/login", {
            email: data.email,
            password: data.password
        })

        if (response.status === 200) {
            const token = response.data.data.token
            console.log(token)
            setTokenFromBackend(token)
            showToast(response.data.message, "success")
            router.push("/(protected)/projects")
        } else {
            showToast(response.data.message, "error")
        }


    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={AuthStyles.container}
                    keyboardShouldPersistTaps="handled"
                    removeClippedSubviews={false}
                >
                    <View style={{ width: "100%", alignItems: "center" }}>

                        <Text style={AuthStyles.title}>Welcome to Task Manager</Text>
                        <Text style={AuthStyles.subtitle}>Login to continue</Text>

                        {/* Email */}
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            rules={{ required: "Email is required" }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={AuthStyles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address" //This is causing flicker due to keyboard behaviour in Native Screens
                                    value={value}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.email && (
                            <Text style={{ color: "red", marginBottom: 10 }}>
                                {errors.email.message}
                            </Text>
                        )}

                        {/* Password */}
                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={AuthStyles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.password && (
                            <Text style={{ color: "red", marginBottom: 10 }}>
                                {errors.password.message}
                            </Text>
                        )}

                        <TouchableOpacity
                            style={AuthStyles.button}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={AuthStyles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <Text
                            onPress={() => router.push("/register")}
                            style={AuthStyles.footerText}
                        >
                            Don't have an account?{" "}
                            <Text style={AuthStyles.linkText}>Register</Text>
                        </Text>

                        <Text
                            onPress={() => router.replace("/(protected)/projects")}
                            style={AuthStyles.footerText}
                        >
                            Go to Projects?{" "}
                            <Text style={AuthStyles.linkText}>Projects</Text>
                        </Text>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}