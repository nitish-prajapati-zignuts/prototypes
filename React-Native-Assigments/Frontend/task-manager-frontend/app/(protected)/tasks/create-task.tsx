import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { UpdateTaskStyles as styles } from "@/styles/UpdateTaskStyles";
import {
    useCreateTask,
} from "@/hooks/TaskHooks/useCreateTask";

import FormInput from "@/components/FormInput";
import FormDropdown from "@/components/Tasks/FromDropDown";
import DatePickerField from "@/components/Tasks/DatePickerField";
import FormButton from "@/components/FormButton";
import { priorityOptions, statusOptions } from "@/constants/DropValue";

export default function CreateTasks() {
    const { projectId } = useLocalSearchParams();
    const { form, loading, allUsers, onSubmit } = useCreateTask(projectId);

    const {
        control,
        formState: { errors },
    } = form;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Create Task</Text>

                {/* Title */}
                <FormInput
                    control={control}
                    name="title"
                    label="Title"
                    placeholder="Enter task title"
                    rules={{ required: "Title is required" }}
                    errors={errors}
                    styles={styles}
                />

                {/* Description */}
                <FormInput
                    control={control}
                    name="description"
                    label="Description"
                    placeholder="Enter description"
                    rules={{ required: "Description is required" }}
                    errors={errors}
                    multiline
                    numberOfLines={4}
                    styles={styles}
                />

                {/* Row */}
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <FormDropdown
                            control={control}
                            name="status"
                            label="Status"
                            data={statusOptions}
                            placeholder="Select Status"
                            rules={{ required: "Status is required" }}
                            errors={errors}
                            styles={styles}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <FormDropdown
                            control={control}
                            name="priority"
                            label="Priority"
                            data={priorityOptions}
                            placeholder="Select Priority"
                            rules={{ required: "Priority is required" }}
                            errors={errors}
                            styles={styles}
                        />
                    </View>
                </View>

                {/* Assigned */}
                <FormDropdown
                    control={control}
                    name="assignedTo"
                    label="Assigned To"
                    data={allUsers.map((u) => ({
                        label: u.name,
                        value: u._id,
                    }))}
                    placeholder="Select Assignee"
                    rules={{ required: "User required" }}
                    errors={errors}
                    styles={styles}
                />

                {/* Date */}
                <DatePickerField
                    control={control}
                    name="dueDate"
                    label="Due Date"
                    rules={{ required: "Due date required" }}
                    styles={styles}
                />

                {/* Button */}
                <FormButton
                    title="Create Task"
                    loading={loading}
                    onPress={onSubmit}
                    styles={styles}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}