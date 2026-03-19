import { StyleSheet } from "react-native";
import { responsiveSize } from "./AuthStyles";
import { responsiveFont } from "./responsive";
import { Colors } from "@/constants/Colors";

export const ProjectDetailsStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background, // Updated from #F8FAFC
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
        color: Colors.textMain, // Updated from #1E293B
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: responsiveSize(16),
        padding: responsiveSize(20),
        marginBottom: responsiveSize(24),
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: responsiveSize(2) },
        shadowOpacity: 0.05,
        shadowRadius: responsiveSize(8),
        elevation: 2,
    },
    sectionTitle: {
        fontSize: responsiveFont(14),
        fontWeight: "700",
        color: Colors.disabled, // Updated from #94A3B8
        marginBottom: responsiveSize(12),
        textTransform: "uppercase"
    },
    descriptionText: {
        fontSize: responsiveFont(16),
        lineHeight: responsiveFont(24),
        color: Colors.textSecondary, // Updated from #475569
    },
    userCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        padding: responsiveSize(16),
        borderRadius: responsiveSize(16),
        borderWidth: 1,
        borderColor: Colors.borderLight, // Updated from #E2E8F0
    },
    avatar: {
        width: responsiveSize(48),
        height: responsiveSize(48),
        borderRadius: responsiveSize(24),
        backgroundColor: Colors.avatarBg,
        justifyContent: "center",
        alignItems: "center",
        marginRight: responsiveSize(16)
    },
    avatarText: {
        color: Colors.white,
        fontSize: responsiveFont(20),
        fontWeight: "bold"
    },
    userInfo: {
        flex: 1
    },
    userName: {
        fontSize: responsiveFont(16),
        fontWeight: "700",
        color: Colors.textMain,
    },
    userEmail: {
        fontSize: responsiveFont(14),
        color: Colors.textLight, // Updated from #64748B
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
        backgroundColor: Colors.successBg,
    },
    badgeDeleted: {
        backgroundColor: Colors.warningBg,
    },
    badgeText: {
        fontSize: responsiveFont(12),
        fontWeight: "700",
        color: Colors.successText,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: responsiveSize(20)
    },
    errorText: {
        color: Colors.error,
        fontSize: responsiveFont(16),
        fontWeight: "600",
        textAlign: "center",
        marginBottom: responsiveSize(16)
    },
    retryButton: {
        backgroundColor: Colors.avatarBg, // Keeping consistency with the primary action blue
        paddingHorizontal: responsiveSize(24),
        paddingVertical: responsiveSize(10),
        borderRadius: responsiveSize(8),
    },
    retryText: {
        color: Colors.white,
        fontWeight: "700",
        fontSize: responsiveFont(14)
    }
});