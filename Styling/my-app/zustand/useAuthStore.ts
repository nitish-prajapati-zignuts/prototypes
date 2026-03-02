import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type AuthState = {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: any, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    devtools((set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (payload, token) => {
        
        set({
          user: payload,
          token: token,
          isAuthenticated: true
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);