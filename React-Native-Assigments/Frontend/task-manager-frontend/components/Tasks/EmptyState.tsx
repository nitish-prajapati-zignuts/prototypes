import React from "react";
import { View, Text } from "react-native";

export default function EmptyState() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No task found for this Project.</Text>
        </View>
    );
}