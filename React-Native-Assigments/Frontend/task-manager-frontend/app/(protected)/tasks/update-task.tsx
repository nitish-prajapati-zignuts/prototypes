import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
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
    title: "Adding New Task #7",
    description: "Adding New Task Description #7",
    status: "TODO",
    priority: "LOW",
    assignedTo: "69afe153f668d5f94dd3fc7a",
    projectId: "69aff4e17d9e40d28484b66b",
    dueDate: "2026-03-28",
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

export default function UpdateTask() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ defaultValues });
    const [open, setOpen] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const onSubmit = (data: FormData) => {
        console.log("Updated Task:", data);
    };

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
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.title && styles.inputError]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Enter task title"
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
                            style={[styles.input, { height: 80 }]}
                            multiline
                            textAlignVertical="top"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                {/* STATUS DROPDOWN */}
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.label}>Status</Text>

                        <Controller
                            control={control}
                            name="status"
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

                {/* DATE PICKER */}
                <Text style={styles.label}>Due Date</Text>
                <Controller
                    control={control}
                    name="dueDate"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowDatePicker(!showDatePicker)}
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

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>Update Task</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
