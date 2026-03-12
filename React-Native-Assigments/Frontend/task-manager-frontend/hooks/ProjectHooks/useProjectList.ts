import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";
import { Project, Pagination, ProjectsResponse } from "@/utils/types/ProjectTypes/project.list";

export const useProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
    });
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const { showToast } = useToast();

    const fetchProjects = useCallback(async (page: number = 1, concat: boolean = false) => {
        try {
            if (page === 1) {
                !refreshing && setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const res = await axiosInstance.get<ProjectsResponse>(
                `/projects/getAllProjects?page=${page}&limit=${pagination.limit}`
            );

            const data = res.data.data;

            setProjects((prev) => (concat ? [...prev, ...data.projects] : data.projects));
            setPagination(data.pagination);
        } catch (error) {
            console.error("Fetch Projects Error:", error);
            showToast("Failed to load projects", "error");
        } finally {
            setLoading(false);
            setRefreshing(false);
            setLoadingMore(false);
        }
    }, [pagination.limit, refreshing, showToast]);

    const deleteProject = useCallback(async (id: string) => {
        try {
            const res = await axiosInstance.delete(`/projects/${id}`);
            if (res.status === 200) {
                showToast("Deleted Successfully", "success");
                fetchProjects(1, false);
            }
        } catch (error) {
            showToast("Something Went Wrong", "error");
        }
    }, [fetchProjects, showToast]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProjects(1, false);
    }, [fetchProjects]);

    const loadMore = useCallback(() => {
        if (pagination.page < pagination.totalPages && !loadingMore && !loading) {
            fetchProjects(pagination.page + 1, true);
        }
    }, [pagination, loadingMore, loading, fetchProjects]);

    useFocusEffect(
        useCallback(() => {
            fetchProjects(1, false);
        }, [fetchProjects])
    );

    return {
        projects,
        loading,
        refreshing,
        loadingMore,
        onRefresh,
        loadMore,
        deleteProject,
    };
};