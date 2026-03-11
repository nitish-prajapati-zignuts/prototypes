import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AddProjectScreenStyles as styles } from "@/styles/AddProject";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  title: string;
  description: string;
};

export default function AddProject() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Project Data:", data);
  };

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
                placeholder="Enter project title"
                style={styles.input}
                value={value}
                onChangeText={onChange}
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
                placeholder="Enter project description"
                style={[styles.input, styles.textArea]}
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description.message}</Text>
          )}

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.saveText}>Save Project</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}