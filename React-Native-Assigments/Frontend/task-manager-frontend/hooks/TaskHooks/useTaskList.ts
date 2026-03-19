import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { axiosInstance } from "@/utils/axiosInstance";
import { TasksResponse, Task } from "@/utils/types/Tasks/tasks.list";

export const useTasksList = (projectId: string | string[] | undefined) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchTasks = useCallback(async () => {
        if (!projectId) return;
        try {
            setLoading(true);
            const res = await axiosInstance.post<TasksResponse>(
                `tasks/getAllTaskbyProjects`,
                { projectId }
            );
            if (res.data.success) {
                setTasks(res.data.data);
            }
        } catch (error) {
            console.log("Fetch Tasks Error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [projectId]);

    // Pull to refresh handler
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTasks();
    }, [fetchTasks]);

    // Re-fetch when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [fetchTasks])
    );

    // Memoized filtering logic
    const filteredTasks = tasks.filter((task) => {
        const statusMatch = statusFilter ? task.status === statusFilter : true;
        const priorityMatch = priorityFilter ? task.priority === priorityFilter : true;
        const searchMatch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());

        return statusMatch && priorityMatch && searchMatch;
    });

    return {
        tasks,
        filteredTasks,
        loading,
        refreshing,
        filters: {
            statusFilter,
            setStatusFilter,
            priorityFilter,
            setPriorityFilter,
            searchQuery,
            setSearchQuery,
        },
        onRefresh,
    };
};