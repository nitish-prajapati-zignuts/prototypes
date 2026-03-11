import React, { createContext, useContext, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

type ToastType = "success" | "error";

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: any) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as ToastType,
  });

  const opacity = new Animated.Value(0);

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ visible: true, message, type });

    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      });
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast.visible && (
        <Animated.View
          style={[
            styles.toast,
            toast.type === "success" ? styles.success : styles.error,
            { opacity },
          ]}
        >
          <Text style={styles.text}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    padding: 14,
    borderRadius: 10,
    elevation: 5,
  },
  success: {
    backgroundColor: "#16a34a",
  },
  error: {
    backgroundColor: "#dc2626",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});