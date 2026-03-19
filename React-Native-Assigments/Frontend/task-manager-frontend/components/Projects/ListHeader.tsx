import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

import { ProjectStyle } from "@/styles/ProjectStyle";
import { responsiveSize } from "@/styles/AuthStyles";

export default function ListHeader() {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
                <Text style={ProjectStyle.heading}>Projects</Text>
                <Text style={ProjectStyle.subheading}>Manage your projects</Text>
            </View>

            <TouchableOpacity onPress={() => router.push("/(protected)/profile")}>
                <AntDesign name="user" size={responsiveSize(24)} />
            </TouchableOpacity>
        </View>
    );
}