import { Platform, StyleSheet } from "react-native";
import { moderateScale, responsiveFont, scale } from "./responsive";

export const UpdateTaskStyles = StyleSheet.create({
    container: {
        padding: moderateScale(20),
        backgroundColor: "#f5f6fa",
        paddingBottom: moderateScale(40),
    },

    header: {
        fontSize: responsiveFont(24),
        fontWeight: "800",
        color: "#1e293b",
        marginBottom: moderateScale(20),
        marginTop: Platform.OS === "ios" ? moderateScale(40) : moderateScale(10),
    },

    label: {
        fontSize: responsiveFont(13),
        fontWeight: "700",
        color: "#64748b",
        marginBottom: moderateScale(6),
        marginTop: moderateScale(16),
        textTransform: "uppercase",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    input: {
        backgroundColor: "#fff",
        borderRadius: moderateScale(8),
        padding: moderateScale(12),
        borderWidth: 1,
        borderColor: "#e2e8f0",
        fontSize: responsiveFont(16),
        color: "#1e293b",
    },

    inputError: {
        borderColor: "#ef4444",
    },

    dropdownContainer: {
        backgroundColor: "#fff",
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
        justifyContent: "center",
    },

    errorText: {
        color: "#ef4444",
        fontSize: responsiveFont(12),
        marginTop: moderateScale(4),
    },

    button: {
        backgroundColor: "#2563eb",
        paddingVertical: moderateScale(16),
        borderRadius: moderateScale(8),
        marginTop: moderateScale(32),
        shadowColor: "#2563eb",
        shadowOffset: { width: 0, height: moderateScale(4) },
        shadowOpacity: 0.2,
        shadowRadius: moderateScale(4),
        elevation: 3,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: responsiveFont(16),
        textAlign: "center",
    },

    dropdown: {
        height: scale(50),
        borderColor: "#e2e8f0",
        borderWidth: 1,
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(12),
        backgroundColor: "#fff",
    },

    pickerContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: moderateScale(10),
    },

    datePicker: {
        width: "100%",
    },
    disabledInput: {
        backgroundColor: "#F3F4F6",
        color: "#9CA3AF",
    },

    disabledDropdown: {
        backgroundColor: "#F3F4F6",
        opacity: 0.7,
    },

    disabledButton: {
        backgroundColor: "#9CA3AF",
    },
});

