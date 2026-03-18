import { useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useToast } from "@/providers/ToastProvider";

export const useProfile = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [loading, setLoading] = useState<boolean>(false);
    const { showToast } = useToast();

    const handleLogout = async () => {
        try {
            setLoading(true);
            logout();
        } catch (error) {
            showToast("Something Went Wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        handleLogout,
    };
};