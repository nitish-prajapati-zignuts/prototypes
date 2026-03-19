import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { UpdateTaskStyles as styles } from "@/styles/UpdateTaskStyles";
import { useUpdateTask } from "@/hooks/TaskHooks/useUpdateTask";
import { statusOptions, priorityOptions } from "@/constants/DropValue";

import FormInput from "@/components/FormInput";
import DatePickerField from "@/components/Tasks/DatePickerField";
import LoaderScreen from "@/components/Projects/LoaderScreen";
import ErrorState from "@/components/Projects/ErrorState";
import FormDropdown from "@/components/Tasks/FromDropDown";

export default function UpdateTask() {
    const { id } = useLocalSearchParams();

    const {
        form,
        loading,
        error,
        allUsers,
        permissions,
        retry,
        onSubmit,
    } = useUpdateTask(id);

    const {
        control,
        formState: { errors },
    } = form;

    const { canEditAll, canChangeStatus } = permissions;

    if (loading) {
        return <LoaderScreen styles={styles} />;
    }

    if (error) {
        return (
            <ErrorState
                message="We couldn't fetch the task details."
                onRetry={retry}
                styles={styles}
            />
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Update Task</Text>

                {/* Title */}
                <FormInput
                    control={control}
                    name="title"
                    label="Title"
                    rules={{ required: "Title is required" }}
                    errors={errors}
                    styles={styles}
                    editable={canEditAll}
                />

                {/* Description */}
                <FormInput
                    control={control}
                    name="description"
                    label="Description"
                    multiline
                    numberOfLines={4}
                    errors={errors}
                    styles={styles}
                    editable={canEditAll}
                />

                {/* Row */}
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <FormDropdown
                            control={control}
                            name="status"
                            label="Status"
                            data={statusOptions}
                            errors={errors}
                            styles={styles}
                            disabled={!canChangeStatus}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <FormDropdown
                            control={control}
                            name="priority"
                            label="Priority"
                            data={priorityOptions}
                            errors={errors}
                            styles={styles}
                            disabled={!canEditAll}
                        />
                    </View>
                </View>

                {/* Assignee */}
                <FormDropdown
                    control={control}
                    name="assignedTo"
                    label="Change Assignee"
                    data={allUsers.map((u) => ({
                        label: u.name,
                        value: u._id,
                    }))}
                    errors={errors}
                    styles={styles}
                    disabled={!canEditAll}
                />

                {/* Date */}
                <DatePickerField
                    control={control}
                    name="dueDate"
                    label="Due Date"
                    styles={styles}
                    editable={canEditAll}
                />

                {/* Button */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        !(canEditAll || canChangeStatus) && { backgroundColor: "#ccc" },
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