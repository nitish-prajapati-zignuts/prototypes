import { StyleSheet } from "react-native";
import { responsiveSize } from "./AuthStyles";
import { responsiveFont } from "./responsive";

export const ProjectDetailsStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F8FAFC"
    },
    container: {
        padding: responsiveSize(10)
    },
    header: {
        marginBottom: responsiveSize(20)
    },
    title: {
        fontSize: responsiveFont(32),
        fontWeight: "800",
        color: "#1E293B"
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: responsiveSize(16),
        padding: responsiveSize(20),
        marginBottom: responsiveSize(24),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: responsiveSize(2) },
        shadowOpacity: 0.05,
        shadowRadius: responsiveSize(8),
        elevation: 2,
    },
    sectionTitle: {
        fontSize: responsiveFont(14),
        fontWeight: "700",
        color: "#94A3B8",
        marginBottom: responsiveSize(12),
        textTransform: "uppercase"
    },
    descriptionText: {
        fontSize: responsiveFont(16),
        lineHeight: responsiveFont(24),
        color: "#475569"
    },
    userCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: responsiveSize(16),
        borderRadius: responsiveSize(16),
        borderWidth: 1,
        borderColor: "#E2E8F0"
    },
    avatar: {
        width: responsiveSize(48),
        height: responsiveSize(48),
        borderRadius: responsiveSize(24),
        backgroundColor: "#3B82F6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: responsiveSize(16)
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: responsiveFont(20),
        fontWeight: "bold"
    },
    userInfo: {
        flex: 1
    },
    userName: {
        fontSize: responsiveFont(16),
        fontWeight: "700",
        color: "#1E293B"
    },
    userEmail: {
        fontSize: responsiveFont(14),
        color: "#64748B"
    },
    statusRow: {
        marginTop: responsiveSize(24),
        flexDirection: "row"
    },
    badge: {
        paddingHorizontal: responsiveSize(12),
        paddingVertical: responsiveSize(6),
        borderRadius: responsiveSize(20)
    },
    badgeActive: {
        backgroundColor: "#DCFCE7"
    },
    badgeDeleted: {
        backgroundColor: "#FEE2E2"
    },
    badgeText: {
        fontSize: responsiveFont(12),
        fontWeight: "700",
        color: "#166534"
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: responsiveSize(20)
    },
    errorText: {
        color: "#EF4444",
        fontSize: responsiveFont(16),
        fontWeight: "600",
        textAlign: "center",
        marginBottom: responsiveSize(16)
    },
    retryButton: {
        backgroundColor: "#3B82F6",
        paddingHorizontal: responsiveSize(24),
        paddingVertical: responsiveSize(10),
        borderRadius: responsiveSize(8),
    },
    retryText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: responsiveFont(14)
    }
});