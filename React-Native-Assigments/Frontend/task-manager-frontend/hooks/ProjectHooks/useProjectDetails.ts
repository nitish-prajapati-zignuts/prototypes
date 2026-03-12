import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { ProjectData } from "@/utils/types/ProjectTypes/project.details";

export const useProjectDetails = (projectId: string | string[] | undefined) => {
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProject = useCallback(async () => {
        if (!projectId) return;

        try {
            setLoading(true);
            setError(null);
            const res = await axiosInstance.get(`/projects/${projectId}`);
            setProject(res.data.data);
        } catch (err) {
            console.error("Fetch project error:", err);
            setError("Failed to load project details");
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    return {
        project,
        loading,
        error,
        retry: fetchProject
    };
};