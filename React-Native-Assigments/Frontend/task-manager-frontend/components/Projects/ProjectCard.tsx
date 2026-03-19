import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ProjectStyle } from "@/styles/ProjectStyle";
import { responsiveSize } from "@/styles/AuthStyles";
import { Project } from "@/utils/types/ProjectTypes/project.list";

type Props = {
    item: Project;
    userId?: string;
    onDelete: (id: string) => void;
};

export default function ProjectCard({ item, userId, onDelete }: Props) {
    return (
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

                {userId === item.userId && (
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
                            <Ionicons name="create-outline" size={responsiveSize(18)} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onDelete(item._id)}
                            style={ProjectStyle.deleteIconButton}
                        >
                            <Ionicons name="trash-outline" size={responsiveSize(18)} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}