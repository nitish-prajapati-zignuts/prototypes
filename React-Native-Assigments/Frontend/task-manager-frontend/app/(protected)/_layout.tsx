import { useAuthStore } from "@/store/AuthStore";
import { Redirect, Stack, useSegments } from "expo-router";
import { useEffect } from "react";

export default function ProtectedLayout() {

    // Get token from Zustand auth store
    // Token means the user has logged in previously
    const token = useAuthStore((s) => s.token);

    // useSegments gives the current route segments
    // We use this to detect route changes
    const segments = useSegments();

    // Check if user is authorized or not
    // This usually comes from the /auth/me API
    const isAuthorized = useAuthStore((s) => s.isAuthorized);

    // Function to verify user from backend
    // This calls /auth/me and updates user + isAuthorized state
    const fetchMe = useAuthStore((s) => s.fetchMe);

    // useEffect runs when token OR route changes
    useEffect(() => {

        // If token exists, verify the user from backend
        // This ensures token is still valid
        if (token) {
            fetchMe();
        }

        // Runs whenever token or route changes
    }, [token, segments]);


    /*
     If there is NO token OR user is not authorized
     Redirect user to the authentication screens
     */
    if (!token || !isAuthorized) {
        return <Redirect href="/(auth)" />;
    }


    // If user is logged in and authorized
    // Render all screens inside the protected folder
    return <Stack screenOptions={{ headerShown: false }} />;
}