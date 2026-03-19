import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TaskListStyles as styles } from "@/styles/TaskListStyles";

type Props = {
    value: string;
    onChange: (text: string) => void;
    disabled: boolean;
};

export default function SearchBar({ value, onChange, disabled }: Props) {
    return (
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#777" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search tasks..."
                placeholderTextColor="#999"
                value={value}
                editable={!disabled}
                onChangeText={onChange}
            />
        </View>
    );
}