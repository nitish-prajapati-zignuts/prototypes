import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

type Props = {
    loading: boolean;
};

export default function EmptyState({ loading }: Props) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {loading ? (
                <View style={{ alignItems: "center" }}>
                    <ActivityIndicator size="small" color="#000" />
                    <Text style={{ marginTop: 8 }}>Loading your projects...</Text>
                </View>
            ) : (
                <Text>No projects found.</Text>
            )}
        </View>
    );
}