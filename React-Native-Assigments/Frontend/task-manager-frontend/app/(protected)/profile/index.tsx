
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { responsiveSize } from "@/styles/AuthStyles";
import { ProfileStyles as styles } from "@/styles/ProfileStyles";
import { useProfile } from "@/hooks/Profile/useProfile";

export default function ProfileIndex() {
    const { user, loading, handleLogout } = useProfile();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name="person-circle-outline"
                    size={responsiveSize(120)}
                    color="#4F46E5"
                />
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

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Ionicons
                            name="log-out-outline"
                            size={responsiveSize(20)}
                            color="#fff"
                        />
                        <Text style={styles.logoutText}>
                            Logout
                        </Text>
                    </>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
}
