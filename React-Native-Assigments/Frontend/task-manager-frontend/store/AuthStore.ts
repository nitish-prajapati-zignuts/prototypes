import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;

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

      setToken: (token) => set({ token }),

      logout: () =>
        set({
          token: null,
          user: null,
        }),

      fetchMe: async () => {
        try {
          const token = get().token;

          if (!token) return;

          set({ loading: true });

          const res = await axios.get("/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          set({
            user: res.data,
            loading: false,
          });
        } catch (error) {
          console.log("ME API Error", error);

          set({
            user: null,
            loading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);