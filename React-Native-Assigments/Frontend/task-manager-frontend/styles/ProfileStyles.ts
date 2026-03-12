import { StyleSheet } from "react-native";
import { responsiveSize } from "./AuthStyles";
import { responsiveFont } from "./responsive";

export const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveSize(20),
        backgroundColor: "#F9FAFB",
    },

    iconContainer: {
        alignItems: "center",
        marginTop: responsiveSize(40),
        marginBottom: responsiveSize(30),
    },

    inputContainer: {
        marginBottom: responsiveSize(20),
    },

    label: {
        fontSize: responsiveFont(14),
        color: "#6B7280",
        marginBottom: responsiveSize(6),
    },

    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: responsiveSize(10),
        padding: responsiveSize(12),
        backgroundColor: "#F3F4F6",
        fontSize: responsiveFont(16),
    },

    logoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EF4444",
        paddingVertical: responsiveSize(14),
        borderRadius: responsiveSize(10),
        marginTop: responsiveSize(40),
    },

    logoutText: {
        color: "#fff",
        fontSize: responsiveFont(16),
        marginLeft: responsiveSize(8),
        fontWeight: "600",
    },
});