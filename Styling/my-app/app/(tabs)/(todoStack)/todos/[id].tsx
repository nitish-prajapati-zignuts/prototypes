import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Task {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  description: string;
  dueDate: string;
  assignedUserDetails?: {
    email: string;
    role: string;
  };
}

export default function SingleViewTodo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await fetch(
          `https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api/tasks/${id}`
        );

        if (!resp.ok) {
          setError("Unable to fetch task.");
          return;
        }

        const data = await resp.json();
        setTask(data);
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return { bg: "#E8F5E9", text: "#2E7D32" };
      case "in-progress":
        return { bg: "#FFF3E0", text: "#EF6C00" };
      default:
        return { bg: "#FFEBEE", text: "#C62828" };
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6750A4" />
      </View>
    );
  }

  if (error || !task) {
    return (
      <View style={styles.center}>
        <MaterialIcons name="error-outline" size={40} color="#999" />
        <Text style={styles.errorText}>
          {error || "No Task Found"}
        </Text>
      </View>
    );
  }

  const statusStyle = getStatusStyle(task.status);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#1C1B1F" />
        </Pressable>
       
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{task.title}</Text>

          <View
            style={[
              styles.badge,
              { backgroundColor: statusStyle.bg },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: statusStyle.text },
              ]}
            >
              {task.status}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>
              {task.description || "No description provided."}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>{task.dueDate}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Assigned To</Text>
            <Text style={styles.value}>
              {task.assignedUserDetails?.email ?? "Unassigned"}
              {task.assignedUserDetails?.role
                ? ` (${task.assignedUserDetails.role})`
                : ""}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F5FF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
   padding:8,
   
  },
  backBtn: {
    padding: 6,
    backgroundColor:'whote'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1B1F",
  },
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    marginTop: 10,
  },
  badgeText: {
    fontWeight: "600",
    fontSize: 12,
    textTransform: "capitalize",
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    marginTop: 6,
    color: "#333",
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});