import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import { Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { useLocalSearchParams } from "expo-router";

import { UpdateTaskStyles as styles } from "@/styles/UpdateTaskStyles";
import { useUpdateTask, statusOptions, priorityOptions } from "@/hooks/TaskHooks/useUpdateTask";

export default function UpdateTask() {
    const { id } = useLocalSearchParams();
    const { form, loading, error, allUsers, permissions, retry, onSubmit } = useUpdateTask(id);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { control, formState: { errors } } = form;
    const { canEditAll, canChangeStatus } = permissions;

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{ marginTop: 10 }}>Loading Task...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorHeader}>Oops! Something went wrong.</Text>
                <Text style={styles.errorSubtext}>We couldn't fetch the task details.</Text>
                <TouchableOpacity style={styles.button} onPress={retry}>
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Update Task</Text>

                {/* TITLE */}
                <Text style={styles.label}>Title</Text>
                <Controller
                    control={control}
                    name="title"
                    rules={{ required: "Title is required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[
                                styles.input,
                                errors.title && { borderColor: 'red' },
                                !canEditAll && styles.disabledInput
                            ]}
                            onChangeText={onChange}
                            value={value}
                            editable={canEditAll}
                        />
                    )}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

                {/* DESCRIPTION */}
                <Text style={styles.label}>Description</Text>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[
                                styles.input,
                                { height: 80 },
                                !canEditAll && styles.disabledInput
                            ]}
                            multiline
                            value={value}
                            onChangeText={onChange}
                            editable={canEditAll}
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
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    style={[styles.dropdown, !canChangeStatus && styles.disabledDropdown]}
                                    data={statusOptions}
                                    labelField="label"
                                    valueField="value"
                                    value={value}
                                    disable={!canChangeStatus}
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
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    style={[styles.dropdown, !canEditAll && styles.disabledDropdown]}
                                    data={priorityOptions}
                                    labelField="label"
                                    valueField="value"
                                    value={value}
                                    disable={!canEditAll}
                                    onChange={(item) => onChange(item.value)}
                                />
                            )}
                        />
                    </View>
                </View>

                {/* ASSIGNEE */}
                <Text style={styles.label}>Change Assignee</Text>
                <Controller
                    control={control}
                    name="assignedTo"
                    render={({ field: { onChange, value } }) => (
                        <Dropdown
                            style={[styles.dropdown, !canEditAll && styles.disabledDropdown]}
                            data={allUsers.map(u => ({ label: u.name, value: u._id }))}
                            labelField="label"
                            valueField="value"
                            value={value}
                            disable={!canEditAll}
                            onChange={(item) => onChange(item.value)}
                        />
                    )}
                />

                {/* DUE DATE */}
                <Text style={styles.label}>Due Date</Text>
                <Controller
                    control={control}
                    name="dueDate"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TouchableOpacity
                                style={[
                                    styles.input,
                                    !canEditAll && styles.disabledInput
                                ]}
                                onPress={() => setShowDatePicker(!showDatePicker)}
                                disabled={!canEditAll}
                            >
                                <Text style={{ color: value ? "#000" : "#999" }}>
                                    {value || "Select Date"}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <View style={styles.pickerContainer}>
                                    <DateTimePicker
                                        value={value ? new Date(value) : new Date()}
                                        mode="date"
                                        display={Platform.OS === "ios" ? "spinner" : "calendar"}
                                        themeVariant="light"
                                        style={styles.datePicker}
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);

                                            if (selectedDate) {
                                                const formatted = selectedDate.toISOString().split("T")[0];
                                                onChange(formatted);
                                            }
                                        }}
                                    />
                                </View>
                            )}
                        </>
                    )}
                />

                {/* SUBMIT BUTTON */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        !(canEditAll || canChangeStatus) && { backgroundColor: '#ccc' }
                    ]}
                    onPress={onSubmit}
                    disabled={!(canEditAll || canChangeStatus)}
                >
                    <Text style={styles.buttonText}>Update Task</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}