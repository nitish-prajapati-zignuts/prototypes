import React from "react";
import { View, Text } from "react-native";

export default function StatusBadge({
    isDeleted,
    styles,
}: {
    isDeleted: boolean;
    styles: any;
}) {
    return (
        <View
            style={[
                styles.badge,
                isDeleted ? styles.badgeDeleted : styles.badgeActive,
            ]}
        >
            <Text style={styles.badgeText}>
                {isDeleted ? "Deleted" : "Active"}
            </Text>
        </View>
    );
}