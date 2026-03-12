import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";
import { FormData } from "@/utils/types/ProjectTypes/AddProject";
import { router } from "expo-router";

export const useUpdateProject = (projectId: string | undefined) => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const { showToast } = useToast();

    const form = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const fetchProjectDetails = useCallback(async () => {
        if (!projectId) return;
        try {
            setLoading(true);
            const res = await axiosInstance.get<{ success: boolean; data: FormData }>(
                `/projects/${projectId}`
            );

            if (res.data.success) {
                form.reset(res.data.data);
            }
        } catch (error) {
            console.log("Fetch Project Error:", error);
            showToast("Could not fetch project details", "error");
        } finally {
            setLoading(false);
        }
    }, [projectId, form, showToast]);

    useEffect(() => {
        fetchProjectDetails();
    }, [fetchProjectDetails]);

    const onUpdate = async (data: FormData) => {
        try {
            setSubmitting(true);
            const res = await axiosInstance.put(`/projects/${projectId}`, data);
            if (res.data.success) {
                showToast("Data Updated Successfully", "success");
                router.back()
            }
        } catch (error) {
            showToast("Data Could Not Updated Successfully", "error");
            console.log("Update Project Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        form,
        loading,
        submitting,
        onSubmit: form.handleSubmit(onUpdate),
        retry: fetchProjectDetails,
    };
};