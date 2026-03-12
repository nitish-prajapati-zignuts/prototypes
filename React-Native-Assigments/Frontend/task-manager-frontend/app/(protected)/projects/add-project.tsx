import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddProjectScreenStyles as styles } from "@/styles/AddProject";
import { useAddProject } from "@/hooks/ProjectHooks/useAddProject";

export default function AddProject() {
  const { form, loading, onSubmit } = useAddProject();

  const {
    control,
    formState: { errors },
  } = form;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.heading}>Add Project</Text>

            {/* Title Field */}
            <Text style={styles.label}>Title</Text>
            <Controller
              control={control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="e.g. Build Task Manager App"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor="#999"
                />
              )}
            />
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}

            {/* Description Field */}
            <Text style={styles.label}>Description</Text>
            <Controller
              control={control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="e.g. This project will help manage tasks efficiently"
                  style={[styles.input, styles.textArea]}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#999"
                />
              )}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description.message}</Text>
            )}

            {/* Save Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveText}>Save Project</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}