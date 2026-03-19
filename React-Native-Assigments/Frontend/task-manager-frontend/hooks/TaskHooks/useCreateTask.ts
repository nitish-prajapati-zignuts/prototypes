import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";
import { FormData, AssignedData } from "@/utils/types/Tasks/createTask.list";


export const defaultTaskValues = {
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
};

export const useCreateTask = (projectId: string | string[] | undefined) => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState<AssignedData>([]);

    const form = useForm<FormData>({
        defaultValues: defaultTaskValues
    });

    const fetchUsers = useCallback(async () => {
        try {
            const res = await axiosInstance.get("/tasks/AssignedUser");
            setAllUsers(res.data.data);
        } catch (error) {
            showToast("Error in Fetching Users", "error");
        }
    }, [showToast]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await axiosInstance.post("/tasks/createTask", {
                ...data,
                projectId
            });
            form.reset();
            router.back();
        } catch (error) {
            showToast("Something went Wrong", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        allUsers,
        onSubmit: form.handleSubmit(onSubmit)
    };
};