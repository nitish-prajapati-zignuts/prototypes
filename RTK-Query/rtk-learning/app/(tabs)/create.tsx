import { useCreateTodoMutation } from '@/stores/api/baseApi';
import { useRouter } from 'expo-router';
import { toast } from 'expo-sonner';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateTodo() {
    const router = useRouter();
    //const { mutateAsync: createTodo, isPending } = useCreateTodo();
    const [createTodo, { isLoading }] = useCreateTodoMutation()
    const [form, setForm] = useState({
        name: '',
        description: '',
        completed: false
    });

    const handleCreate = async () => {
        if (!form.name.trim()) return; // Basic validation

        try {
            await createTodo({
                name: form.name,
                description: form.description,
                completed: false
            }).unwrap()
            toast.success("Task created successfully!")
            router.back(); // Return to home on success
        } catch (e) {
            // console.error("Failed to create task", e);
            toast.error("Something went wrong!")
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.backButton}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>New Task</Text>
                        <View style={{ width: 50 }} /> {/* Spacer for centering */}
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Task Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Buy groceries"
                            placeholderTextColor="#9CA3AF"
                            value={form.name}
                            onChangeText={(text) => setForm({ ...form, name: text })}
                        />

                        <Text style={styles.label}>Description (Optional)</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Add more details..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={4}
                            value={form.description}
                            onChangeText={(text) => setForm({ ...form, description: text })}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, !form.name.trim() && styles.buttonDisabled]}
                        onPress={handleCreate}
                        disabled={isLoading || !form.name.trim()}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.submitButtonText}>Create Task</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    backButton: {
        color: '#6B7280',
        fontSize: 16,
    },
    form: {
        marginBottom: 40,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#111827',
        marginBottom: 24,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top', // Align text to top on Android
    },
    submitButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 18,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: '#E5E7EB',
        shadowOpacity: 0,
        elevation: 0,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});