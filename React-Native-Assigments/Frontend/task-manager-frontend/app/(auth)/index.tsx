
import React from "react";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller } from "react-hook-form";
import { router } from "expo-router";
import { AuthStyles as styles } from "@/styles/AuthStyles";
import { useLogin } from "@/hooks/Auth/useLogin";

export default function Login() {
    const { control, errors, onSubmit, loading, setLoading } = useLogin();

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.innerContainer}>
                        <Text style={styles.title}>Welcome to Task Manager</Text>
                        <Text style={styles.subtitle}>Login to continue</Text>

                        <Text style={styles.label}>Email Address</Text>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="name@example.com"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    value={value}
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                        <Text style={styles.label}>Password</Text>
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: "Password is required" }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    secureTextEntry
                                    placeholderTextColor="#999"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                        <TouchableOpacity style={styles.button} onPress={onSubmit}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
                        </TouchableOpacity>

                        <Text onPress={() => router.push("/register")} style={styles.footerText}>
                            Don't have an account? <Text style={styles.linkText}>Register</Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}