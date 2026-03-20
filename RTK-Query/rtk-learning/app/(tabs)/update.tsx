import { useUpdateTodo } from '@/api/queries';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { toast } from 'expo-sonner';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UpdateTodo() {
  const router = useRouter();
  const { id, name, description, completed } = useLocalSearchParams();
  const { mutateAsync: updateTodo, isPending } = useUpdateTodo();

  // 1. Initialize state with the existing params
  const [formData, setFormData] = useState({
    name: (name as string) || "",
    description: (description as string) || "",
    completed: completed === 'true',
  });

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      await updateTodo({
        id: id as string,
        data: formData, // Sending the current state
      });

      toast.success("Task updated!");
      router.back();
    } catch (e) {
      toast.error("Failed to update task");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Edit Task</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>TASK ID (Read Only)</Text>
          <Text style={styles.idText}>{id}</Text>

          <View style={styles.divider} />

          {/* TITLE INPUT */}
          <Text style={styles.label}>TITLE</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Task name"
          />

          <View style={styles.divider} />

          {/* DESCRIPTION INPUT */}
          <Text style={styles.label}>DESCRIPTION</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Add a description..."
            multiline
            numberOfLines={3}
          />

          <View style={styles.divider} />

          {/* STATUS TOGGLE */}
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.label}>STATUS</Text>
              <Text style={[styles.statusInfo, formData.completed ? styles.textSuccess : styles.textWarning]}>
                {formData.completed ? "Marked as Done" : "Marked as Pending"}
              </Text>
            </View>
            <Switch
              value={formData.completed}
              onValueChange={(val) => setFormData({ ...formData, completed: val })}
              trackColor={{ false: "#D1D5DB", true: "#10B981" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, isPending && styles.buttonDisabled]}
          onPress={handleUpdate}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 8,
  },
  idText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontFamily: 'System',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  textSuccess: { color: '#059669' },
  textWarning: { color: '#D97706' },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  cancelText: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
});