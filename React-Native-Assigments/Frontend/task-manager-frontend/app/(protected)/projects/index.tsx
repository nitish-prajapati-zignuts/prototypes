import { responsiveSize } from "@/styles/AuthStyles";
import { ProjectStyle } from "@/styles/ProjectStyle";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const MockData = [
  { id: 1, title: "Project 1", description: "Description 1" },
  { id: 2, title: "Project 2", description: "Description 2" },
  { id: 3, title: "Project 3", description: "Description 3" },
];

export default function ProjectIndex() {
  const [projects, setProjects] = useState(MockData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setProjects([...MockData]);
      setRefreshing(false);
    }, 1500);
  };

  const renderItem = ({ item }: { item: (typeof MockData)[0] }) => (
    <TouchableOpacity
      style={ProjectStyle.card}
      onPress={() =>
        router.push({
          pathname: "/(protected)/projects/project-details",
          params: { id: item.id },
        })
      }
    >
      <Text style={ProjectStyle.title}>{item.title}</Text>
      <Text style={ProjectStyle.description}>{item.description}</Text>

      <View style={ProjectStyle.buttonRow}>
        {/* LEFT */}
        <TouchableOpacity
          style={ProjectStyle.viewButton}
          onPress={() =>
            router.push({
              //pathname: "/(projects)/project-details",
              pathname:"/(protected)/tasks",
              params: { id: item.id },
            })
          }
        >
          <Ionicons name="list-outline" size={responsiveSize(16)} color="#fff" />
          <Text style={ProjectStyle.buttonText}>View Tasks</Text>
        </TouchableOpacity>

        {/* RIGHT */}

        {/* Add Id to this Param */}
        <View style={ProjectStyle.rightButtons}>
          <TouchableOpacity onPress={() => router.push("/(protected)/projects/update-project")} style={ProjectStyle.iconButton}>
            <Ionicons name="create-outline" size={responsiveSize(18)} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={ProjectStyle.deleteIconButton}>
            <Ionicons name="trash-outline" size={responsiveSize(18)} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={ProjectStyle.safeArea}>
      <View style={ProjectStyle.container}>
        <Text style={ProjectStyle.heading}>Projects</Text>
        <Text style={ProjectStyle.subheading}>Manage your projects</Text>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<Text style={ProjectStyle.empty}>No Projects Found</Text>}
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

