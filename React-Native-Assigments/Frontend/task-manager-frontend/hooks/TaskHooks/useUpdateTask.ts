import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";
import { useAuthStore } from "@/store/AuthStore";
import { FormData, AssignedData } from "@/utils/types/Tasks/updateTask";

export const statusOptions = [
    { label: "Todo", value: "TODO" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Done", value: "DONE" },
];

export const priorityOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
];
export const useUpdateTask = (taskId: string | string[] | undefined) => {
    const { showToast } = useToast();
    const user = useAuthStore((state) => state.user);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [allUsers, setAllUsers] = useState<AssignedData>([]);
    const [permissions, setPermissions] = useState({ canEditAll: false, canChangeStatus: false });

    const form = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
            status: "TODO",
            priority: "LOW",
            assignedTo: "",
            dueDate: "",
        }
    });

    const fetchTaskData = useCallback(async () => {
        if (!taskId) return;
        try {
            setLoading(true);
            setError(false);
            const [taskRes, usersRes] = await Promise.all([
                axiosInstance.get(`/tasks/${taskId}`),
                axiosInstance.get("/tasks/AssignedUser")
            ]);

            const task = taskRes.data.data;
            setAllUsers(usersRes.data.data);

            // Populate form
            form.reset({
                ...task,
                dueDate: task.dueDate?.split("T")[0]
            });

            // Permissions Logic
            const isCreator = user?._id === task.userId;
            const isAssignee = user?._id === task.assignedTo;

            setPermissions({
                canEditAll: isCreator,
                canChangeStatus: isCreator || isAssignee
            });

        } catch (err) {
            setError(true);
            showToast("Failed to load task details", "error");
        } finally {
            setLoading(false);
        }
    }, [taskId, user?._id, form, showToast]);

    useEffect(() => {
        fetchTaskData();
    }, [fetchTaskData]);

    const handleUpdate = async (data: FormData) => {
        try {
            await axiosInstance.put(`/tasks/${taskId}`, { taskId, ...data });
            showToast("Task Updated Successfully", "success");
            router.back();
        } catch (err) {
            showToast("Error in Updating Task", "error");
        }
    };

    return {
        form,
        loading,
        error,
        allUsers,
        permissions,
        retry: fetchTaskData,
        onSubmit: form.handleSubmit(handleUpdate)
    };
};