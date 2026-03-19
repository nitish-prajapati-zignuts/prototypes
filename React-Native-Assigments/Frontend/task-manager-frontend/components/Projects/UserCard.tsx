import React from "react";
import { View, Text } from "react-native";

type Props = {
    name: string;
    email: string;
    styles: any;
};

export default function UserCard({ name, email, styles }: Props) {
    return (
        <View style={styles.userCard}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {name?.charAt(0).toUpperCase()}
                </Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userEmail}>{email}</Text>
            </View>
        </View>
    );
}