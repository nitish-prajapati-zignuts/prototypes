import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "@/utils/axiosInstance";
import { router } from "expo-router";

type User = {
  _id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthorized: boolean;
  isHydrated: boolean;

  setHydrated: (state: boolean) => void;
  setToken: (token: string) => void;
  logout: () => void;
  fetchMe: () => Promise<void>;
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      isAuthorized: false,
      isHydrated: false,

      setHydrated: (state) => set({ isHydrated: state }),

      setToken: (token) => set({ token }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthorized: false,
        }),

      fetchMe: async () => {
        try {
          const token = get().token;
          if (!token) return;

          set({ loading: true });

          const res = await axiosInstance.post("/auth/me");
          const { user, isAuthorized } = res.data.data;

          if (!isAuthorized && user == null) {
            set({
              user: null,
              token: null,
              isAuthorized: false,
              loading: false,
            });

            router.replace("/(auth)");
            return;
          }

          set({
            user,
            isAuthorized: true,
            loading: false,
          });

        } catch (error) {
          console.log("ME API Error", error);

          set({
            user: null,
            token: null,
            isAuthorized: false,
            loading: false,
          });

          router.replace("/(auth)");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),

      // ⭐ hydration callback
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);