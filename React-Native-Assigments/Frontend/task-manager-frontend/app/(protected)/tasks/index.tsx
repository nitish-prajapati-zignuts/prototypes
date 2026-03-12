import { responsiveSize } from "@/styles/AuthStyles";
import { TaskListStyles as styles } from "@/styles/TaskListStyles";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { axiosInstance } from "@/utils/axiosInstance";
import { Dropdown } from "react-native-element-dropdown";


// Types based on API
export type User = {
  _id: string;
  name: string;
  email: string;
  __v?: number;
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  isDeleted: boolean;
  __v?: number;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  projectId: Project;
  userId: User;
  assignedTo: User;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type TasksResponse = {
  success: boolean;
  message: string;
  data: Task[];
};

const statusOptions = [
  { label: "All", value: "" },
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

const priorityOptions = [
  { label: "All", value: "" },
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
];

export default function TasksList() {
  const { id } = useLocalSearchParams(); // project id
  console.log("Project Id", id)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Fetch tasks from API
  const fetchTasks = async (id: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post<TasksResponse>(
        `tasks/getAllTaskbyProjects`, {
        projectId: id
      }
      );
      console.log(res.data)
      if (res.data.success) {
        setTasks(res.data.data);
      }
    } catch (error) {
      console.log("Fetch Tasks Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter ? task.status === statusFilter : true;
    const priorityMatch = priorityFilter ? task.priority === priorityFilter : true;

    const searchMatch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && priorityMatch && searchMatch;
  });
  useFocusEffect(useCallback(() => {
    if (id) fetchTasks(id as string)
  }, [id]))


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks(id as string);
  }, [id]);

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
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1890ff" />
      </View>
    );
  }
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
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor="#999"
          value={searchQuery}
          editable={tasks.length > 0 ? true : false}
          onChangeText={setSearchQuery}
        />
      </View>

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

      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveSize(90) }}
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => !loading && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No task found for this Project.</Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push(`/(protected)/tasks/create-task?projectId=${id}`)}
        style={styles.fab}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

