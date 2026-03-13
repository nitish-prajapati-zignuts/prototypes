import React from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { responsiveSize } from "@/styles/AuthStyles";
import { ProjectStyle } from "@/styles/ProjectStyle";
import { Project } from "@/utils/types/ProjectTypes/project.list";
import { useProjectList } from "@/hooks/ProjectHooks/useProjectList";

export default function ProjectIndex() {
  const {
    projects,
    loading,
    refreshing,
    loadingMore,
    onRefresh,
    loadMore,
    deleteProject,
    user
  } = useProjectList();

  const renderItem = ({ item }: { item: Project }) => (
    <TouchableOpacity
      style={ProjectStyle.card}
      onPress={() => router.push({
        pathname: "/(protected)/projects/project-details",
        params: { id: item._id },
      })}
    >
      <Text style={ProjectStyle.title}>{item.title}</Text>
      <Text style={ProjectStyle.description}>{item.description}</Text>

      <View style={ProjectStyle.buttonRow}>
        <TouchableOpacity
          style={ProjectStyle.viewButton}
          onPress={() => router.push({
            pathname: "/(protected)/tasks",
            params: { id: item._id },
          })}
        >
          <Ionicons name="list-outline" size={responsiveSize(16)} color="#fff" />
          <Text style={ProjectStyle.buttonText}>View Tasks</Text>
        </TouchableOpacity>

        <View style={ProjectStyle.rightButtons}>
          {user?._id === item.userId && (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: "/(protected)/projects/update-project",
                params: { id: item._id },
              })}
              style={ProjectStyle.iconButton}
            >
              <Ionicons name="create-outline" size={responsiveSize(18)} color="#fff" />
            </TouchableOpacity>)}
          {user?._id === item.userId && (
            <TouchableOpacity onPress={() => deleteProject(item._id)} style={ProjectStyle.deleteIconButton}>
              <Ionicons name="trash-outline" size={responsiveSize(18)} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={ProjectStyle.safeArea}>
      <View style={ProjectStyle.container}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text style={ProjectStyle.heading}>Projects</Text>
            <Text style={ProjectStyle.subheading}>Manage your projects</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/(protected)/profile")}>
            <AntDesign name="user" size={responsiveSize(24)} />
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveSize(90) }}
          data={projects}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => loadingMore ? <ActivityIndicator size="small" color="#000" style={{ margin: 10 }} /> : null}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              {loading ? (
                <View style={{ alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#000" />
                  <Text style={{ marginTop: 8 }}>Loading your projects...</Text>
                </View>
              ) : (
                <Text>No projects found.</Text>
              )}
            </View>
          )}
        />

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