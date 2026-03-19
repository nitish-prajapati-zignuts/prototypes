import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddProjectScreenStyles as styles } from "@/styles/AddProject";
import { useAddProject } from "@/hooks/ProjectHooks/useAddProject";

import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";

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

            <FormInput
              control={control}
              name="title"
              label="Title"
              placeholder="e.g. Build Task Manager App"
              rules={{ required: "Title is required" }}
              errors={errors}
              styles={styles}
            />

            <FormInput
              control={control}
              name="description"
              label="Description"
              placeholder="e.g. This project will help manage tasks efficiently"
              rules={{ required: "Description is required" }}
              errors={errors}
              multiline
              numberOfLines={4}
              styles={styles}
            />

            <FormButton
              title="Save Project"
              loading={loading}
              onPress={onSubmit}
              styles={styles}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}