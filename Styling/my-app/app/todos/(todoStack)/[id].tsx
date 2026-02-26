import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

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
  const [isLoading, setLoading] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const [error,setError] = useState("")

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await fetch(
          `https://unvolcanic-alfonzo-nonverminous.ngrok-free.dev/api/tasks/${id}`
        );

        if(resp.status !== 200){
            setError(resp.statusText)
            //console.log(resp.statusText)
            return
        }

        const data = await resp.json();
        
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "in-progress":
        return "#FF9800";
      default:
        return "#F44336";
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>No Task Found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{task.title}</Text>

          {/* Corrected dynamic style implementation */}
          <View
            style={[
              styles.badge,
              { backgroundColor: getStatusColor(task.status) },
            ]}
          >
            <Text style={styles.badgeText}>{task.status}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{task.description || "No description provided."}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>{task.dueDate}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Assigned To</Text>
            <Text style={styles.value}>
              {task.assignedUserDetails?.email ?? "Unassigned"}
              {task.assignedUserDetails?.role ? ` (${task.assignedUserDetails.role})` : ""}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  section: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: "#333",
    lineHeight: 22,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "capitalize",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
  },
});