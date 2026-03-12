import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { UpdateTaskStyles as styles } from "@/styles/UpdateTaskStyles";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";
import { useAuthStore } from "@/store/AuthStore";


type FormData = {
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo: string;
    projectId: string;
    dueDate: string;
};

type User = {
    _id: string
    name: string
    email: string
}

type AssignedData = User[]

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
    const { id } = useLocalSearchParams(); // Task ID from route
    const [loading, setLoading] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [allUser, setAllUser] = useState<AssignedData>([])
    const { showToast } = useToast()
    const user = useAuthStore((state) => state.user)
    const [canEditAll, setCanEditAll] = useState(false)
    const [canChangeStatus, setCanChangeStatus] = useState(false)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
            status: "TODO",
            priority: "LOW",
            assignedTo: "",
            projectId: "",
            dueDate: "",
        },
    });

    // Fetch task by ID
    const fetchTask = async (taskId: string) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/tasks/${taskId}`);
            const task = res.data.data;

            console.log(task)

            // Populate the form
            setValue("title", task.title);
            setValue("description", task.description);
            setValue("status", task.status);
            setValue("priority", task.priority);
            setValue("assignedTo", task.assignedTo || "");
            setValue("projectId", task.projectId || "");
            setValue("dueDate", task.dueDate.split("T")[0]); // YYYY-MM-DD

            // if (task.userId === user?._id && task.assignedTo === user?._id) {
            //     setIsEditable(true)
            // } else {
            //     setIsEditable(false)
            // }
            if (user?._id === task.userId) {
                // Creator → full edit
                setCanEditAll(true)
                setCanChangeStatus(true)
            }
            else if (user?._id === task.assignedTo) {
                // Assignee → status only
                setCanEditAll(false)
                setCanChangeStatus(true)
            }
            else {
                // Other users → read only
                setCanEditAll(false)
                setCanChangeStatus(false)
            }
        } catch (error) {
            showToast("Error in Fetching Task", "error")
            console.error("Error fetching task:", error);
        } finally {
            setLoading(false);
        }
    };

    //Drop Down for Assigning Changes
    const fetchUsers = useCallback(async () => {
        setLoading(true)

        try {
            const res = await axiosInstance.get("/tasks/AssignedUser")
            const data = res.data.data as AssignedData

            setAllUser(data)
        } catch (error) {
            showToast("Error in Fetching Users", "error")

            console.log("Something Went Wrong", error)
        }
    }, [])

    useEffect(() => {
        if (!id) return;

        const fetchTaskPromise = async () => {
            try {
                //Fetching Multiple API Calls
                await Promise.all([
                    fetchTask(id as string),
                    fetchUsers()
                ]);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTaskPromise();
    }, [id]);

    const onSubmit = async (data: FormData) => {
        try {
            const updateddata = {
                taskId: id,
                ...data
            }
            const res = await axiosInstance.put(`/tasks/${id}`, updateddata);
            console.log("Task updated:", res.data);
            showToast("Task Updated Successfully", "success")

            router.back();
        } catch (error) {
            showToast("Error in Updating Task", "error")

            console.error("Error updating task:", error);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000" />
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
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[
                                styles.input,
                                errors.title && styles.inputError,
                                !canEditAll && styles.disabledInput
                            ]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            editable={canEditAll}
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
                            style={[
                                styles.input,
                                { height: 80 },
                                !canEditAll && styles.disabledInput
                            ]}
                            multiline
                            textAlignVertical="top"
                            value={value}
                            onChangeText={onChange}
                            editable={canEditAll}
                        //editable={user?._id}
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
                                    style={[
                                        styles.dropdown,
                                        !canChangeStatus && styles.disabledDropdown
                                    ]}
                                    data={statusOptions}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Status"
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
                                    style={[
                                        styles.dropdown,
                                        !canEditAll && styles.disabledDropdown
                                    ]}
                                    data={priorityOptions}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Priority"
                                    value={value}
                                    disable={!canEditAll}
                                    onChange={(item) => onChange(item.value)}
                                />
                            )}
                        />
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Change Assignee</Text>

                    <Controller
                        control={control}
                        name="assignedTo"
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={[
                                    styles.dropdown,
                                    !canEditAll && styles.disabledDropdown
                                ]}
                                data={allUser.map(user => ({ label: user.name, value: user._id }))}
                                labelField="label"
                                valueField="value"
                                placeholder="Select User"
                                value={value}
                                disable={!canEditAll}
                                onChange={(item) => onChange(item.value)}
                            />
                        )}
                    />
                </View>

                {/* DATE PICKER */}
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

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                    disabled={!(canEditAll || canChangeStatus)}
                >
                    <Text style={styles.buttonText}>Update Task</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
