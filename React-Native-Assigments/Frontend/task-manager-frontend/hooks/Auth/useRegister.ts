import { useState } from "react";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { authApi } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";

type FormData = {
    name: string;
    email: string;
    password: string;
};

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onRegister = async (data: FormData) => {
        try {
            setLoading(true);
            const response = await authApi.post("/register", data);

            if (response.status === 201 || response.data.success) {
                showToast("Account created successfully!", "success");
                router.replace("/(auth)"); // Redirect to login
            } else {
                showToast(response.data.message || "Registration failed", "error");
            }
        } catch (error: any) {
            console.error("Register Error:", error);
            showToast(error?.response?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        control,
        errors,
        loading,
        onSubmit: handleSubmit(onRegister),
    };
};