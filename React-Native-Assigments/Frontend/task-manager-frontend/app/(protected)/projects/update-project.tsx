import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { AddProjectScreenStyles as styles } from "@/styles/AddProject";
import { useUpdateProject } from "@/hooks/ProjectHooks/useUpdateProject";

import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";
import LoaderScreen from "@/components/Projects/LoaderScreen";

export default function UpdateProject() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { form, loading, submitting, onSubmit } = useUpdateProject(id);

  const {
    control,
    formState: { errors },
  } = form;

  if (loading) {
    return <LoaderScreen styles={styles} />;
  }

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
          <FormInput
            control={control}
            name="title"
            label="Project Title"
            placeholder="Enter project title"
            rules={{ required: "Title is required" }}
            errors={errors}
            styles={styles}
          />

          {/* Description */}
          <FormInput
            control={control}
            name="description"
            label="Description"
            placeholder="Enter project description"
            rules={{ required: "Description is required" }}
            errors={errors}
            multiline
            numberOfLines={4}
            styles={styles}
          />

          {/* Button */}
          <FormButton
            title="Update Project"
            loading={submitting}
            onPress={onSubmit}
            styles={styles}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}