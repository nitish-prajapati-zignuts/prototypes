import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { TaskListStyles as styles } from "@/styles/TaskListStyles";
import { statusOptions, priorityOptions } from "@/constants/DropValue";

type Props = {
    status: string | null;
    setStatus: (v: string) => void;
    priority: string | null;
    setPriority: (v: string) => void;
};

export default function TaskFilters({
    status,
    setStatus,
    priority,
    setPriority,
}: Props) {
    return (
        <View style={styles.row}>
            <Dropdown
                style={styles.dropdown}
                data={statusOptions}
                labelField="label"
                valueField="value"
                placeholder="Status"
                value={status}
                onChange={(item) => setStatus(item.value)}
            />

            <Dropdown
                style={styles.dropdown}
                data={priorityOptions}
                labelField="label"
                valueField="value"
                placeholder="Priority"
                value={priority}
                onChange={(item) => setPriority(item.value)}
            />
        </View>
    );
}