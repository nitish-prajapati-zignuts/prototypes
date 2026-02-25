import { loginStyles } from '@/styles/AuthStyle';
import { router } from 'expo-router';
import React from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={80}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={loginStyles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={loginStyles.card}>
                            <Text style={loginStyles.title}>Register</Text>

                            <Text style={loginStyles.label}>Enter your email</Text>
                            <TextInput
                                style={loginStyles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#888"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="emailAddress"
                            />

                            <Text style={loginStyles.label}>Enter your password</Text>
                            <TextInput
                                style={loginStyles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#888"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="password"
                            />

                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity style={loginStyles.button} activeOpacity={0.8}>
                                    <Text style={loginStyles.buttonText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.replace("/")} style={loginStyles.button} activeOpacity={0.8}>
                                    <Text style={loginStyles.buttonText}>Already Have an Account? Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
