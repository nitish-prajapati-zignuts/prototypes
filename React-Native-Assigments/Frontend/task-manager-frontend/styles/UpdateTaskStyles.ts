import { Platform, StyleSheet } from "react-native";
import { moderateScale, responsiveFont, scale } from "./responsive";
import { Colors } from "@/constants/Colors";

export const UpdateTaskStyles = StyleSheet.create({
    container: {
        padding: moderateScale(20),
        backgroundColor: Colors.background, // Updated from #f5f6fa
        paddingBottom: moderateScale(40),
    },

    header: {
        fontSize: responsiveFont(24),
        fontWeight: "800",
        color: Colors.textMain, // Updated from #1e293b
        marginBottom: moderateScale(20),
        marginTop: Platform.OS === "ios" ? moderateScale(40) : moderateScale(10),
    },

    label: {
        fontSize: responsiveFont(13),
        fontWeight: "700",
        color: Colors.textLight, // Updated from #64748b
        marginBottom: moderateScale(6),
        marginTop: moderateScale(16),
        textTransform: "uppercase",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    input: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(8),
        padding: moderateScale(12),
        borderWidth: 1,
        borderColor: Colors.borderLight, // Updated from #e2e8f0
        fontSize: responsiveFont(16),
        color: Colors.textMain,
    },

    inputError: {
        borderColor: Colors.error, // Updated from #ef4444
    },

    dropdownContainer: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: Colors.borderLight,
        overflow: "hidden",
        justifyContent: "center",
    },

    errorText: {
        color: Colors.error,
        fontSize: responsiveFont(12),
        marginTop: moderateScale(4),
    },

    button: {
        backgroundColor: Colors.avatarBg, // Using the primary blue action color
        paddingVertical: moderateScale(16),
        borderRadius: moderateScale(8),
        marginTop: moderateScale(32),
        shadowColor: Colors.avatarBg,
        shadowOffset: { width: 0, height: moderateScale(4) },
        shadowOpacity: 0.2,
        shadowRadius: moderateScale(4),
        elevation: 3,
    },

    buttonText: {
        color: Colors.white,
        fontWeight: "bold",
        fontSize: responsiveFont(16),
        textAlign: "center",
    },

    dropdown: {
        height: scale(50),
        borderColor: Colors.borderLight,
        borderWidth: 1,
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(12),
        backgroundColor: Colors.white,
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
        backgroundColor: Colors.backgroundGrey, // Updated from #F3F4F6
        color: Colors.textPlaceholder, // Updated from #9CA3AF
    },

    disabledDropdown: {
        backgroundColor: Colors.backgroundGrey,
        opacity: 0.7,
    },

    disabledButton: {
        backgroundColor: Colors.disabled, // Updated from #94A3B8
    },

    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        padding: moderateScale(20),
    },

    errorHeader: {
        fontSize: responsiveFont(18),
        fontWeight: "bold",
        color: Colors.textMain,
        textAlign: "center",
    },

    errorSubtext: {
        fontSize: responsiveFont(14),
        color: Colors.textLight,
        textAlign: "center",
        marginTop: moderateScale(8),
        marginBottom: moderateScale(20),
    },
});