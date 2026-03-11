import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { axiosInstance } from "@/utils/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProjectDetailsStyles as styles } from "@/styles/ProjectDetails";
import {ProjectData} from "@/utils/types/project.details"


export default function ProjectDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const res = await axiosInstance.get(`/projects/${id}`);
                setProject(res.data.data); 
            } catch (err) {
                console.error("Fetch project error:", err);
                setError("Failed to load project");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ActivityIndicator size="large" color="#3B82F6" style={{ flex: 1 }} />
            </SafeAreaView>
        );
    }

    if (error || !project) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={{ color: "red", fontSize: 16 }}>{error || "Project not found"}</Text>
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

