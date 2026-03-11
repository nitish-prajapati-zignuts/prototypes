import { StyleSheet } from "react-native";



export const ProjectDetailsStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F8FAFC"
    },
    container: {
        padding: 24
    },
    header: {
        marginBottom: 24
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#1E293B"
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#94A3B8",
        marginBottom: 12,
        textTransform: "uppercase"
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#475569"
    },
    userCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 16, borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#3B82F6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold"
    },
    userInfo: {
        flex: 1
    },
    userName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B"
    },
    userEmail: {
        fontSize: 14,
        color: "#64748B"
    },
    statusRow: {
        marginTop: 24,
        flexDirection: "row"
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20
    },
    badgeActive: {
        backgroundColor: "#DCFCE7"
    },
    badgeDeleted: {
        backgroundColor: "#FEE2E2"
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#166534"
    },
});