import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as SecureStore from 'expo-secure-store'
import SecureStorage from "@/services/SecureStorage";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  getUser :() => Promise<string | null>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "@auth_user";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (userData: User) => {
    setUser(userData);
    // await AsyncStorage.setItem(
    //   STORAGE_KEY,
    //   JSON.stringify(userData)
    // );
    //await SecureStore.setItemAsync(STORAGE_KEY,JSON.stringify(userData))
    SecureStorage.setItem(STORAGE_KEY,JSON.stringify(userData))
  };

  const logout = async () => {
    setUser(null);
    //await SecureStore.deleteItemAsync(STORAGE_KEY)
    SecureStorage.removeItem(STORAGE_KEY)
  };

  const getUser = async () => {
    return SecureStorage.getItem(STORAGE_KEY)
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        //const storedUser = await SecureStore.getItemAsync(STORAGE_KEY)
        const storedUser = await SecureStorage.getItem(STORAGE_KEY)
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Failed to load user", error);
      }
    };

    loadUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      getUser
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};