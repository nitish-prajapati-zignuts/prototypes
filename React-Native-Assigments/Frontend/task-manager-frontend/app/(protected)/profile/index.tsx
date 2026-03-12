import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { responsiveSize } from "@/styles/AuthStyles";
import { useAuthStore } from "@/store/AuthStore";
import { useToast } from "@/providers/ToastProvider";

export default function ProfileIndex() {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const [loading, setLoading] = useState<boolean>(false)
    const { showToast } = useToast()
    const handleLogout = () => {
        try {
            setLoading(true)
            logout()
            setLoading(false)
        } catch (error) {
            showToast("Something Went Wrong", "error")
        }

    }
    return (
        <SafeAreaView style={styles.container}>

            {/* Profile Icon */}
            <View style={styles.iconContainer}>
                <Ionicons name="person-circle-outline" size={responsiveSize(120)} color="#4F46E5" />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    value={user?.name}
                    editable={false}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={user?.email}
                    editable={false}
                    style={styles.input}
                />
            </View>


            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Ionicons name="log-out-outline" size={responsiveSize(20)} color="#fff" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
    },

    iconContainer: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 30,
    },

    inputContainer: {
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#F3F4F6",
        fontSize: 16,
    },

    logoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EF4444",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 40,
    },

    logoutText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
        fontWeight: "600",
    },
});