import React from "react";
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { responsiveSize } from "@/styles/AuthStyles";
import { TaskListStyles as styles } from "@/styles/TaskListStyles";
import { useTasksList } from "@/hooks/TaskHooks/useTaskList";

import TaskCard from "@/components/Tasks/TaskCard";
import SearchBar from "@/components/Tasks/SearchBar";
import TaskFilters from "@/components/Tasks/TaskFilters";
import EmptyState from "@/components/Tasks/EmptyState";

export default function TasksList() {
  const { id } = useLocalSearchParams();

  const {
    tasks,
    filteredTasks,
    loading,
    refreshing,
    filters,
    onRefresh,
  } = useTasksList(id);

  const {
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    searchQuery,
    setSearchQuery,
  } = filters;

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1890ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        disabled={tasks.length === 0}
      />

      {tasks.length > 0 && (
        <TaskFilters
          status={statusFilter}
          setStatus={setStatusFilter}
          priority={priorityFilter}
          setPriority={setPriorityFilter}
        />
      )}

      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveSize(90) }}
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TaskCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />

      <TouchableOpacity
        onPress={() =>
          router.push(`/(protected)/tasks/create-task?projectId=${id}`)
        }
        style={styles.fab}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}