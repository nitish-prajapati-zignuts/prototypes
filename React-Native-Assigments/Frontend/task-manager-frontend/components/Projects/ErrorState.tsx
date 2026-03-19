import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    message: string;
    onRetry: () => void;
    styles: any;
};

export default function ErrorState({ message, onRetry, styles }: Props) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{message}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}