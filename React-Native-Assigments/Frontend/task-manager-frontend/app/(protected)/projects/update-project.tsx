import React, { useEffect, useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { AddProjectScreenStyles as styles } from "@/styles/AddProject";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";

type FormData = {
  title: string;
  description: string;
};

export default function UpdateProject() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast()
  
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const fetchProjectDetailsById = async (projectId: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get<{ success: boolean; data: FormData }>(
        `/projects/${projectId}`
      );

      if (res.data.success) {
        reset(res.data.data);
      }
    } catch (error) {
      console.log("Fetch Project Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectDetailsById(id);
    }
  }, [id]);

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitting(true);
      const res = await axiosInstance.put(`/projects/${id}`, data);
      if (res.data.success) {
        showToast("Data Updated Successfully", "success")
      }
    } catch (error) {
      showToast("Data Could Not Updated Successfully", "error")
      console.log("Update Project Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", flex: 1 }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
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
          {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

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

          <TouchableOpacity
            style={[styles.saveButton, submitting && { opacity: 0.7 }]}
            onPress={handleSubmit(onSubmit)}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveText}>Update Project</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}