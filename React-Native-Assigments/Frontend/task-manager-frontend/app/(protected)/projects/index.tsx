import { responsiveSize } from "@/styles/AuthStyles";
import { ProjectStyle } from "@/styles/ProjectStyle";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";

import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/providers/ToastProvider";
import { Project, Pagination, ProjectsResponse } from "@/utils/types/project.list"

export default function ProjectIndex() {
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
  const { showToast } = useToast()

  const fetchProjects = async (page: number = 1, concat: boolean = false) => {
    if (loading) return;

    try {
      page === 1 ? setLoading(true) : setLoadingMore(true);

      const res = await axiosInstance.get<ProjectsResponse>(
        `/projects/getAllProjects?page=${page}&limit=${pagination.limit}`
      );

      const data = res.data.data;

      if (concat) {
        setProjects((prev) => [...prev, ...data.projects]);
      } else {
        setProjects(data.projects);
      }

      setPagination(data.pagination);
    } catch (error) {
      console.log("Fetch Projects Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };


  const deleteTasks = useCallback(async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/projects/${id}`);
      if (res.status === 200) {
        showToast("Deleted Successfully", "success");
        // Refresh the list after deletion
        fetchProjects(1, false);
      } else {
        showToast("Something Went Wrong", "error");
      }
    } catch (error) {
      showToast("Something Went Wrong", "error");
    }
  }, [pagination.limit]); // Only recreate if limit changes

  useFocusEffect(
    useCallback(() => {
      fetchProjects(); // refetch on focus
    }, [deleteTasks])
  );


  const onRefresh = async () => {
    setRefreshing(true);
    fetchProjects(1, false);
  };

  const onEndReached = () => {
    if (pagination.page < pagination.totalPages && !loadingMore) {
      fetchProjects(pagination.page + 1, true);
    }
  };


  const renderItem = ({ item }: { item: Project }) => (
    <TouchableOpacity
      style={ProjectStyle.card}
      onPress={() =>
        router.push({
          pathname: "/(protected)/projects/project-details",
          params: { id: item._id },
        })
      }
    >
      <Text style={ProjectStyle.title}>{item.title}</Text>
      <Text style={ProjectStyle.description}>{item.description}</Text>

      <View style={ProjectStyle.buttonRow}>
        <TouchableOpacity
          style={ProjectStyle.viewButton}
          onPress={() =>
            router.push({
              pathname: "/(protected)/tasks",
              params: { id: item._id },
            })
          }
        >
          <Ionicons name="list-outline" size={responsiveSize(16)} color="#fff" />
          <Text style={ProjectStyle.buttonText}>View Tasks</Text>
        </TouchableOpacity>

        <View style={ProjectStyle.rightButtons}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(protected)/projects/update-project",
                params: { id: item._id },
              })
            }
            style={ProjectStyle.iconButton}
          >
            <Ionicons
              name="create-outline"
              size={responsiveSize(18)}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteTasks(item._id)} style={ProjectStyle.deleteIconButton}>
            <Ionicons
              name="trash-outline"
              size={responsiveSize(18)}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={ProjectStyle.safeArea}>
      <View style={ProjectStyle.container}>
        <View style={{ flexDirection: "row", alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <View>
            <Text style={ProjectStyle.heading}>Projects</Text>
            <Text style={ProjectStyle.subheading}>Manage your projects</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => router.push("/(protected)/profile")}>
              <AntDesign name="user" size={responsiveSize(24)} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveSize(90) }}
          data={projects}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            loadingMore ? (
              <ActivityIndicator size="small" color="#000" style={{ margin: 10 }} />
            ) : null
          }
          ListEmptyComponent={() => !loading && (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text>No task found for this Project.</Text>
            </View>
          )}
        />

        {/* Floating Add Button */}
        <TouchableOpacity
          style={ProjectStyle.fab}
          onPress={() => router.push("/(protected)/projects/add-project")}
        >
          <Ionicons name="add" size={responsiveSize(28)} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}