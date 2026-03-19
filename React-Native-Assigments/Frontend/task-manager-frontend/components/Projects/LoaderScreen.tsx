import React from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoaderScreen({ styles }: { styles: any }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
            </View>
        </SafeAreaView>
    );
}