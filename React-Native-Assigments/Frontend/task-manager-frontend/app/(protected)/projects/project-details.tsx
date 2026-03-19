import React from "react";
import { View, Text, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProjectDetailsStyles as styles } from "@/styles/ProjectDetails";
import { useProjectDetails } from "@/hooks/ProjectHooks/useProjectDetails";

import LoaderScreen from "@/components/Projects/LoaderScreen";
import ErrorState from "@/components/Projects/ErrorState";
import UserCard from "@/components/Projects/UserCard";
import StatusBadge from "@/components/Projects/StatusBadge";

export default function ProjectDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { project, loading, error, retry } = useProjectDetails(id);

    if (loading) {
        return <LoaderScreen styles={styles} />;
    }

    if (error || !project) {
        return (
            <ErrorState
                message={error || "Project not found"}
                onRetry={retry}
                styles={styles}
            />
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{project.title}</Text>
                </View>

                {/* Description */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        {project.description}
                    </Text>
                </View>

                {/* User */}
                <Text style={styles.sectionTitle}>Project Owner</Text>
                <UserCard
                    name={project.userId.name}
                    email={project.userId.email}
                    styles={styles}
                />

                {/* Status */}
                <View style={styles.statusRow}>
                    <StatusBadge
                        isDeleted={project.isDeleted}
                        styles={styles}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}