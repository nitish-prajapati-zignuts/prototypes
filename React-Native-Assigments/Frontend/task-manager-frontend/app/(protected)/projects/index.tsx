import React from "react";
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ProjectStyle } from "@/styles/ProjectStyle";
import { responsiveSize } from "@/styles/AuthStyles";
import { useProjectList } from "@/hooks/ProjectHooks/useProjectList";

import ProjectCard from "@/components/Projects/ProjectCard";
import ListHeader from "@/components/Projects/ListHeader";
import EmptyState from "@/components/Projects/EmptyState";

export default function ProjectIndex() {
  const {
    projects,
    loading,
    refreshing,
    loadingMore,
    onRefresh,
    loadMore,
    deleteProject,
    user,
  } = useProjectList();

  return (
    <SafeAreaView style={ProjectStyle.safeArea}>
      <View style={ProjectStyle.container}>

        <ListHeader />

        <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveSize(90) }}
          data={projects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProjectCard
              item={item}
              userId={user?._id}
              onDelete={deleteProject}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#000" style={{ margin: 10 }} />
            ) : null
          }
          ListEmptyComponent={<EmptyState loading={loading} />}
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