import { responsiveSize } from "@/styles/AuthStyles";
import { TaskListStyles as styles } from "@/styles/TaskListStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useCallback } from "react";
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";



const mockTasks = [
    {
        id: "1",
        title: "Adding New Task #1",
        description: "Adding New Task Description #1",
        status: "TODO",
        priority: "LOW",
        dueDate: "2026-03-28",
    },
    {
        id: "2",
        title: "Adding New Task #2",
        description: "Adding New Task Description #2",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        dueDate: "2026-03-29",
    },
    {
        id: "3",
        title: "Adding New Task #3",
        description: "Adding New Task Description #3",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2026-03-30",
    },
    {
        id: "4",
        title: "Adding New Task #3",
        description: "Adding New Task Description #3",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2026-03-30",
    },
    {
        id: "5",
        title: "Adding New Task #3",
        description: "Adding New Task Description #3",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2026-03-30",
    },
    {
        id: "6",
        title: "Adding New Task #3",
        description: "Adding New Task Description #3",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2026-03-30",
    },
];

export default function TasksList() {
    const [tasks, setTasks] = useState(mockTasks);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setTasks((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    title: `Adding New Task #${prev.length + 1}`,
                    description: `Adding New Task Description #${prev.length + 1}`,
                    status: "TODO",
                    priority: "LOW",
                    dueDate: "2026-03-28",
                },
            ]);

            setRefreshing(false);
        }, 1200);
    }, []);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "HIGH":
                return "#ff4d4f";
            case "MEDIUM":
                return "#faad14";
            default:
                return "#52c41a";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DONE":
                return "#52c41a";
            case "IN_PROGRESS":
                return "#1890ff";
            default:
                return "#8c8c8c";
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
            </View>

            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.row}>
                <View
                    style={[
                        styles.badge,
                        { backgroundColor: getStatusColor(item.status) },
                    ]}
                >
                    <Text style={styles.badgeText}>{item.status}</Text>
                </View>

                <View
                    style={[
                        styles.badge,
                        { backgroundColor: getPriorityColor(item.priority) },
                    ]}
                >
                    <Text style={styles.badgeText}>{item.priority}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.due}>Due: {item.dueDate}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={() => router.push("/(tasks)/update-task")}
                        style={styles.iconButton}
                    >
                        <Ionicons name="create-outline" size={responsiveSize(18)} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteIconButton}>
                        <Ionicons name="trash-outline" size={responsiveSize(18)} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Tasks</Text>

            <FlatList
                contentContainerStyle={{ paddingBottom: responsiveSize(90) }}
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity onPress={() => router.push("/(tasks)/create-task")} style={styles.fab}>
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>
        </View>
    );
}
