import { StyleSheet } from "react-native";
import { responsiveSize } from "./AuthStyles";
import { responsiveFont } from "./responsive";
import { Colors } from "@/constants/Colors";

export const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveSize(20),
        backgroundColor: Colors.backgroundAlt,
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
        color: Colors.textLight,
        marginBottom: responsiveSize(6),
    },

    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: responsiveSize(10),
        padding: responsiveSize(12),
        backgroundColor: Colors.backgroundGrey,
        fontSize: responsiveFont(16),
        color: Colors.textMain, // Added to ensure text visibility
    },

    logoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.error,
        paddingVertical: responsiveSize(14),
        borderRadius: responsiveSize(10),
        marginTop: responsiveSize(40),
        // Adding a slight shadow for depth
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    logoutText: {
        color: Colors.white,
        fontSize: responsiveFont(16),
        marginLeft: responsiveSize(8),
        fontWeight: "600",
    },
});