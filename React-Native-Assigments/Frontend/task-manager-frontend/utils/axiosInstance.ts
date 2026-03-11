import axios from "axios";

const BASE_URL = "https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api";

export const authApi = axios.create({
    baseURL: `${BASE_URL}/auth`,
    timeout: 10000
});

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

// REQUEST INTERCEPTOR: Inject Token
axiosInstance.interceptors.request.use(
    async (config) => {
        // Accessing state directly via getState() to avoid circular dependency/hook errors

        const { useAuthStore } = await import("@/store/AuthStore")
        const token = useAuthStore.getState().token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Handle Global Errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                console.log("Unauthorized - Logging out...");
                // Clear store and redirect
                const { useAuthStore } = await import("@/store/AuthStore")
                useAuthStore.getState().logout();
            }
        }
        // IMPORTANT: Rejecting the error so your try/catch in components actually works
        return Promise.reject(error);
    }
);

// AUTH API RESPONSE INTERCEPTOR
authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log auth-specific errors (login failed, etc.)
        console.log("Auth API Error:", error.response?.status);
        return Promise.reject(error);
    }
);