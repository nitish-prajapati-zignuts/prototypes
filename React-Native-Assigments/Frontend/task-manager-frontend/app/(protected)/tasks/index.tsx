
import React from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";

import { responsiveSize } from "@/styles/AuthStyles";
import { TaskListStyles as styles } from "@/styles/TaskListStyles";
import { Task } from "@/utils/types/Tasks/tasks.list";
import { useTasksList } from "@/hooks/TaskHooks/useTaskList";
import { statusOptions, priorityOptions } from "@/constants/DropValue";

export default function TasksList() {
  const { id } = useLocalSearchParams();
  const { tasks, filteredTasks, loading, refreshing, filters, onRefresh } = useTasksList(id);

  const {
    statusFilter, setStatusFilter,
    priorityFilter, setPriorityFilter,
    searchQuery, setSearchQuery
  } = filters;

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = { HIGH: "#ff4d4f", MEDIUM: "#faad14" };
    return colors[priority] || "#52c41a";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = { DONE: "#52c41a", IN_PROGRESS: "#1890ff" };
    return colors[status] || "#8c8c8c";
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
      </View>

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
        <Text style={styles.due}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/(protected)/tasks/update-task", params: { id: item._id } })}
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

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor="#999"
          value={searchQuery}
          editable={tasks.length > 0}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Section */}
      {tasks.length > 0 && (
        <View style={styles.row}>
          <Dropdown
            style={styles.dropdown}
            data={statusOptions}
            labelField="label"
            valueField="value"
            placeholder="Status"
            value={statusFilter}
            onChange={(item) => setStatusFilter(item.value)}
          />

          <Dropdown
            style={styles.dropdown}
            data={priorityOptions}
            labelField="label"
            valueField="value"
            placeholder="Priority"
            value={priorityFilter}
            onChange={(item) => setPriorityFilter(item.value)}
          />
        </View>
      )}

      {/* List Section */}
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveSize(90) }}
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No task found for this Project.</Text>
          </View>
        )}
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push(`/(protected)/tasks/create-task?projectId=${id}`)}
        style={styles.fab}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}