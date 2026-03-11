import { useAuthStore } from "@/store/AuthStore";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

export default function ProtectedLayout() {
    const token = useAuthStore((s) => s.token);
    const isAuthorized = useAuthStore((s) => s.isAuthorized);
    const fetchMe = useAuthStore((s) => s.fetchMe);

    useEffect(() => {
        if (token) {
            fetchMe();
        }
    }, [token]);

    if (!token || !isAuthorized) {
        return <Redirect href="/(auth)" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}