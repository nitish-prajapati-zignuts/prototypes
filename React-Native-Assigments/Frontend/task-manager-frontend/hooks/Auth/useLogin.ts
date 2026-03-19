import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { authApi } from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/AuthStore";
import { useToast } from "@/providers/ToastProvider";

type FormData = {
    email: string;
    password: string;
};

export const useLogin = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [loading, setLoading] = useState<boolean>(false)
    const setTokenFromBackend = useAuthStore((state) => state.setToken);
    //const token = useAuthStore((state) => state.token);
    //const isAuthorized = useAuthStore((state) => state.isAuthorized);
    const { showToast } = useToast();

    // Handle Redirection if already authorized
    // useEffect(() => {
    //     if (token && isAuthorized) {
    //         router.replace("/(protected)/projects");
    //     }
    // }, [token, isAuthorized]);

    const onLogin = async (data: FormData) => {
        try {
            setLoading(true)
            const response = await authApi.post("/login", {
                email: data.email,
                password: data.password
            });

            if (response.status === 200) {
                const token = response.data.data.token;
                setTokenFromBackend(token);
                showToast(response.data.message, "success");
                router.push("/(protected)/projects");
            } else {
                showToast(response.data.message, "error");
            }
        } catch (error: any) {
            showToast(error?.response?.data?.message || "Login failed", "error");
        } finally {
            setLoading(false)
        }
    };

    return {
        control,
        errors,
        onSubmit: handleSubmit(onLogin),
        loading,
        setLoading
    };
};