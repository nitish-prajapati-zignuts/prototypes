import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { UpdateTaskStyles as styles } from "@/styles/UpdateTaskStyles";

type FormData = {
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo: string;
    projectId: string;
    dueDate: string;
};

const defaultValues: FormData = {
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
    projectId: "",
    dueDate: "",
};

const statusOptions = [
    { label: "Todo", value: "TODO" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Done", value: "DONE" },
];

const priorityOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
];

export default function CreateTasks() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ defaultValues });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const onSubmit = (data: FormData) => {
        console.log("Created Task:", data);
    };

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
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.title && (
                    <Text style={styles.errorText}>{errors.title.message}</Text>
                )}

                {/* DESCRIPTION */}
                <Text style={styles.label}>Description</Text>
                <Controller
                    control={control}
                    name="description"
                    rules={{ required: "Description is required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, { height: 80 }]}
                            multiline
                            textAlignVertical="top"
                            placeholder="Enter description"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.description && (
                    <Text style={styles.errorText}>{errors.description.message}</Text>
                )}

                {/* STATUS + PRIORITY */}
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
                        {errors.status && (
                            <Text style={styles.errorText}>{errors.status.message}</Text>
                        )}
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
                        {errors.priority && (
                            <Text style={styles.errorText}>{errors.priority.message}</Text>
                        )}
                    </View>
                </View>

                {/* ASSIGNED USER */}
                <Text style={styles.label}>Assigned To</Text>
                <Controller
                    control={control}
                    name="assignedTo"
                    rules={{ required: "User ID required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.assignedTo && styles.inputError]}
                            placeholder="User ID"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.assignedTo && (
                    <Text style={styles.errorText}>{errors.assignedTo.message}</Text>
                )}

                {/* PROJECT */}
                <Text style={styles.label}>Project ID</Text>
                <Controller
                    control={control}
                    name="projectId"
                    rules={{ required: "Project ID required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.projectId && styles.inputError]}
                            placeholder="Project ID"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.projectId && (
                    <Text style={styles.errorText}>{errors.projectId.message}</Text>
                )}

                {/* DATE PICKER */}
                <Text style={styles.label}>Due Date</Text>
                <Controller
                    control={control}
                    name="dueDate"
                    rules={{ required: "Due date required" }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowDatePicker(true)}
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
                                        display={
                                            Platform.OS === "ios" ? "spinner" : "calendar"
                                        }
                                        themeVariant="light"
                                        style={styles.datePicker}
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);

                                            if (selectedDate) {
                                                const formatted =
                                                    selectedDate.toISOString().split("T")[0];
                                                onChange(formatted);
                                            }
                                        }}
                                    />
                                </View>
                            )}
                        </>
                    )}
                />
                {errors.dueDate && (
                    <Text style={styles.errorText}>{errors.dueDate.message}</Text>
                )}

                {/* BUTTON */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}