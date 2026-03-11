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
import { router, useLocalSearchParams } from "expo-router";
import { AddProjectScreenStyles as styles } from "@/styles/AddProject";

type FormData = {
  title: string;
  description: string;
};

export default function UpdateProject() {
  const { id, title, description } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: (title as string) || "",
      description: (description as string) || "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Updated Project:", { id, ...data });

    // API call here

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Update Project</Text>

          {/* Title */}
          <Text style={styles.label}>Project Title</Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter project title"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.title && (
            <Text style={styles.error}>{errors.title.message}</Text>
          )}

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter project description"
                multiline
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description.message}</Text>
          )}

          {/* Update Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.saveText}>Update Project</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}