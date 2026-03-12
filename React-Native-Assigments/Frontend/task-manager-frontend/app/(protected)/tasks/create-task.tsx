import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, ScrollView,
    KeyboardAvoidingView, Platform, ActivityIndicator,
} from "react-native";
import { Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { useLocalSearchParams } from "expo-router";

import { UpdateTaskStyles as styles } from "@/styles/UpdateTaskStyles";
import { priorityOptions, statusOptions, useCreateTask } from "@/hooks/TaskHooks/useCreateTask";
import { responsiveSize } from "@/styles/AuthStyles";

export default function CreateTasks() {
    const { projectId } = useLocalSearchParams();
    const { form, loading, allUsers, onSubmit } = useCreateTask(projectId);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { control, formState: { errors } } = form;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Create Task</Text>

                {/* TITLE */}
                <Text style={styles.label}>Title</Text>
                <Controller
                    control={control}
                    name="title"
                    rules={{ required: "Title is required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.title && styles.inputError]}
                            placeholder="Enter task title"
                            value={value}
                            placeholderTextColor="#999"
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

                {/* DESCRIPTION */}
                <Text style={styles.label}>Description</Text>
                <Controller
                    control={control}
                    name="description"
                    rules={{ required: "Description is required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            multiline
                            textAlignVertical="top"
                            placeholder="Enter description"
                            value={value}
                            placeholderTextColor="#999"
                            onChangeText={onChange}
                        />
                    )}
                />

                {/* STATUS & PRIORITY ROW */}
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.label}>Status</Text>
                        <Controller
                            control={control}
                            name="status"
                            rules={{ required: "Status is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    style={styles.dropdown}
                                    data={statusOptions}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Status"
                                    value={value}
                                    onChange={(item) => onChange(item.value)}
                                />
                            )}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Priority</Text>
                        <Controller
                            control={control}
                            name="priority"
                            rules={{ required: "Priority is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    style={styles.dropdown}
                                    data={priorityOptions}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Priority"
                                    value={value}
                                    onChange={(item) => onChange(item.value)}
                                />
                            )}
                        />
                    </View>
                </View>

                {/* ASSIGNED USER */}
                <Text style={styles.label}>Assigned To</Text>
                <Controller
                    control={control}
                    name="assignedTo"
                    rules={{ required: "User ID required" }}
                    render={({ field: { onChange, value } }) => (
                        <Dropdown
                            style={styles.dropdown}
                            data={allUsers.map(user => ({ label: user.name, value: user._id }))}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Assignee"
                            value={value}
                            onChange={(item) => onChange(item.value)}
                        />
                    )}
                />

                {/* DATE PICKER */}
                <Text style={styles.label}>Due Date</Text>
                <Controller
                    control={control}
                    name="dueDate"
                    rules={{ required: "Due date required" }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TouchableOpacity
                                style={[styles.input, { justifyContent: 'center' }]} // Ensure vertical alignment
                                onPress={() => setShowDatePicker(!showDatePicker)}
                                activeOpacity={0.7}
                            >
                                <Text style={{
                                    color: value ? "#1A1A1A" : "#999", // Darker black for light mode visibility
                                    fontSize: responsiveSize(14)
                                }}>
                                    {value || "Select Date"}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={value ? new Date(value) : new Date()}
                                    mode="date"
                                    style={styles.datePicker}
                                    display={Platform.OS === "ios" ? "spinner" : "default"} // "inline" is often better for visibility on iOS
                                    themeVariant="light" // Force light theme to prevent "Invisible" white-on-white text
                                    onChange={(event, selectedDate) => {
                                        // On Android, the picker closes automatically; on iOS, you might need a "Done" button
                                        if (Platform.OS === 'android') setShowDatePicker(false);

                                        if (event.type === "set" && selectedDate) {
                                            onChange(selectedDate.toISOString().split("T")[0]);
                                        } else {
                                            setShowDatePicker(!showDatePicker);
                                        }
                                    }}
                                />
                            )}
                        </>
                    )}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={onSubmit}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Task</Text>}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


