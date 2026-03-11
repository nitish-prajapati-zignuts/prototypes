import React, { useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { AddProjectScreenStyles as styles } from "@/styles/AddProject";
import { SafeAreaView } from "react-native-safe-area-context";
import { axiosInstance } from "@/utils/axiosInstance";
import { router } from "expo-router";
import { useToast } from "@/providers/ToastProvider";

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

  const [loading, setLoading] = useState(false);
  const { showToast } = useToast()
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Submitting Project:", data);

      // POST request to backend
      const response = await axiosInstance.post("/projects/create", data);

      if (response.data.success) {
        //console.log("Project added successfully:", response.data.data);
        // Redirect back to projects list
        showToast("Task Created Successfully", "success")
        router.back();
      } else {

        console.log("Failed to add project:", response.data.message);
        showToast("Task Could Not Be Created Successfully", "error")

      }
    } catch (error) {
      console.log("Add Project Error:", error);
      showToast("Something Went Wrong", "error")
    } finally {
      setLoading(false);
    }
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
              onPress={handleSubmit(onSubmit)}
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