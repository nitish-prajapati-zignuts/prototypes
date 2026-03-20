import { Todo } from "@/api/queries";
import { useGetTodosQuery } from "@/stores/api/baseApi";
import { router } from "expo-router";
import React from "react";
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  //const { data, isLoading, error } = useTodos();
  const { data, isLoading, error } = useGetTodosQuery()
  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push({
        pathname: "/update",
        params: { id: item._id, name: item.name, description: item.description, completed: String(item.completed) }
      })}
    >
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, item.completed && styles.completedText]}>
            {item.name}
          </Text>
          <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
        </View>

        <View style={[styles.badge, item.completed ? styles.badgeSuccess : styles.badgePending]}>
          <Text style={styles.badgeText}>
            {item.completed ? "Done" : "Pending"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
      </View>

      {isLoading && <Text style={styles.centerText}>Loading your tasks...</Text>}
      {error && <Text style={styles.errorText}>Oops! Something went wrong</Text>}

      <FlatList
        data={data}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push("/create")} // Assuming your create screen is at /create
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  listPadding: {
    padding: 16,
    paddingBottom: 100, // Extra space so FAB doesn't cover last item
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  contentContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#ADB5BD",
  },
  description: {
    fontSize: 14,
    color: "#6C757D",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeSuccess: {
    backgroundColor: "#D1FAE5",
  },
  badgePending: {
    backgroundColor: "#FEF3C7",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  centerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#6C757D",
  },
  errorText: {
    textAlign: "center",
    color: "#EF4444",
    marginTop: 20,
  },
  /* FAB Styles */
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2563EB", // Primary blue color
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabIcon: {
    color: "white",
    fontSize: 32,
    fontWeight: "300",
    marginTop: -2, // Optical centering
  },
});