import { StyleSheet } from "react-native";
import { responsiveSize } from "./AuthStyles";
import { responsiveFont, moderateScale, scale } from "./responsive";
import { Colors } from "@/constants/Colors";

export const TaskListStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveSize(16),
        backgroundColor: Colors.background, // Updated from #f5f6fa
    },

    header: {
        fontSize: responsiveFont(26),
        fontWeight: "700",
        marginBottom: responsiveSize(16),
        color: Colors.textContrast, // Updated from #1a1a1a
    },

    card: {
        backgroundColor: Colors.white,
        padding: responsiveSize(16),
        borderRadius: responsiveSize(14),
        margin: responsiveSize(8),
        shadowColor: Colors.shadow,
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    cardHeader: {
        marginBottom: responsiveSize(6),
    },

    title: {
        fontSize: responsiveFont(16),
        fontWeight: "600",
        color: Colors.textSecondary, // Updated from #222
    },

    description: {
        color: Colors.textMuted, // Updated from #666
        fontSize: responsiveFont(14),
        marginBottom: responsiveSize(10),
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: responsiveSize(8),
        gap: responsiveSize(10)
    },

    badge: {
        paddingHorizontal: responsiveSize(10),
        paddingVertical: responsiveSize(4),
        borderRadius: responsiveSize(20),
        marginRight: responsiveSize(8),
    },

    badgeText: {
        color: Colors.white,
        fontSize: responsiveFont(12),
        fontWeight: "600",
    },

    due: {
        fontSize: responsiveFont(12),
        color: Colors.textPlaceholder, // Updated from #888
    },

    fab: {
        position: "absolute",
        bottom: responsiveSize(25),
        right: responsiveSize(20),
        backgroundColor: Colors.primaryLight, // Updated from #1890ff
        width: responsiveSize(55),
        height: responsiveSize(55),
        borderRadius: responsiveSize(30),
        alignItems: "center",
        justifyContent: "center",
        shadowColor: Colors.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 6,
    },

    fabText: {
        color: Colors.white,
        fontSize: responsiveFont(28),
        fontWeight: "600",
    },

    iconButton: {
        backgroundColor: Colors.primary, // Replaced PRIMARY variable
        padding: scale(8),
        borderRadius: moderateScale(8),
    },

    deleteIconButton: {
        backgroundColor: Colors.error, // Updated from #EF4444
        padding: scale(8),
        borderRadius: moderateScale(8),
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: responsiveSize(8),
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: responsiveSize(8),
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.backgroundGrey, // Updated from #F3F4F6
        borderRadius: responsiveSize(12),
        paddingHorizontal: responsiveSize(12),
        marginBottom: responsiveSize(15),
    },

    searchInput: {
        flex: 1,
        paddingVertical: responsiveSize(10),
        paddingLeft: responsiveSize(10),
        fontSize: responsiveFont(16),
        color: Colors.textMain,
    },

    button: {
        flex: 1,
        backgroundColor: Colors.primaryDark, // Updated from #4F46E5
        paddingVertical: responsiveSize(12),
        borderRadius: responsiveSize(12),
        alignItems: "center",
    },

    buttonText: {
        color: Colors.white,
        fontWeight: "600",
        fontSize: responsiveFont(16),
    },

    dropdown: {
        flex: 1,
        backgroundColor: Colors.backgroundGrey, // Adjusted for consistency
        borderRadius: responsiveSize(8),
        paddingHorizontal: responsiveSize(10),
        marginRight: responsiveSize(10),
        marginBottom: responsiveSize(12),
        padding: responsiveSize(20)
    },

    sectionTitle: {
        fontSize: responsiveFont(18),
        fontWeight: "700",
        color: Colors.textMain,
        marginBottom: responsiveSize(10),
        marginTop: responsiveSize(15),
    },
});