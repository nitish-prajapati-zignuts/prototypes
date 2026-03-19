import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

type Props = {
    title: string;
    loading: boolean;
    onPress: () => void;
    styles: any;
};

export default function FormButton({
    title,
    loading,
    onPress,
    styles,
}: Props) {
    return (
        <TouchableOpacity
            style={styles.saveButton}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.saveText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}