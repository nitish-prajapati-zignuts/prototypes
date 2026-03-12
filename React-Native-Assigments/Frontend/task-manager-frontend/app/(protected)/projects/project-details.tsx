import React from "react";
import {
    View,
    Text,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectDetailsStyles as styles } from "@/styles/ProjectDetails";
import { useProjectDetails } from "@/hooks/ProjectHooks/useProjectDetails";

export default function ProjectDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { project, loading, error, retry } = useProjectDetails(id);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3B82F6" />
                </View>
            </SafeAreaView>
        );
    }

    if (error || !project) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error || "Project not found"}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={retry}>
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{project.title}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{project.description}</Text>
                </View>

                <Text style={styles.sectionTitle}>Project Owner</Text>
                <View style={styles.userCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {project.userId.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{project.userId.name}</Text>
                        <Text style={styles.userEmail}>{project.userId.email}</Text>
                    </View>
                </View>

                <View style={styles.statusRow}>
                    <View
                        style={[
                            styles.badge,
                            project.isDeleted ? styles.badgeDeleted : styles.badgeActive,
                        ]}
                    >
                        <Text style={styles.badgeText}>
                            {project.isDeleted ? "Deleted" : "Active"}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}