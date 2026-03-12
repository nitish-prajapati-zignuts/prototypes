import { useState } from "react";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";
import { FormData } from "@/utils/types/ProjectTypes/AddProject";

export const useAddProject = () => {
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const form = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const handleCreate = async (data: FormData) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("/projects/create", data);

            if (response.data.success) {
                showToast("Project Created Successfully", "success");
                router.back();
            } else {
                showToast(response.data.message || "Project could not be created", "error");
            }
        } catch (error) {
            console.error("Add Project Error:", error);
            showToast("Something Went Wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        onSubmit: form.handleSubmit(handleCreate),
    };
};