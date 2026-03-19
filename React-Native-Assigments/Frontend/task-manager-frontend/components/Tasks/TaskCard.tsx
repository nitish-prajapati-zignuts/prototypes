import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Task } from "@/utils/types/Tasks/tasks.list";
import { TaskListStyles as styles } from "@/styles/TaskListStyles";
import { responsiveSize } from "@/styles/AuthStyles";

type Props = {
    item: Task;
};

export default function TaskCard({ item }: Props) {
    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            HIGH: "#ff4d4f",
            MEDIUM: "#faad14",
        };
        return colors[priority] || "#52c41a";
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            DONE: "#52c41a",
            IN_PROGRESS: "#1890ff",
        };
        return colors[status] || "#8c8c8c";
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.row}>
                <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.badgeText}>{item.status}</Text>
                </View>

                <View style={[styles.badge, { backgroundColor: getPriorityColor(item.priority) }]}>
                    <Text style={styles.badgeText}>{item.priority}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.due}>
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                </Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: "/(protected)/tasks/update-task",
                                params: { id: item._id },
                            })
                        }
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
}