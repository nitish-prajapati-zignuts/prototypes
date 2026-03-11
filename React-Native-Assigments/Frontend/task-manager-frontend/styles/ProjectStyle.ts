import { StyleSheet } from "react-native";
import { scale, moderateScale, responsiveFont, PRIMARY } from "./responsive";


export const ProjectStyle = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: "#F3F4F6",
  },

  card: {
    backgroundColor: "#fff",
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: scale(14),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(6),
    elevation: 4,
  },

  title: {
    fontSize: responsiveFont(18),
    fontWeight: "700",
    color: "#111827",
  },

  heading: {
    fontSize: responsiveFont(24),
    fontWeight: "700",
    //marginBottom: scale(20),
    color: "#111827",
  },
  subheading:{
    fontSize: responsiveFont(16),
    fontWeight: "500",
    marginBottom: scale(20),
    color: "#111827",
  },

  description: {
    fontSize: responsiveFont(14),
    color: "#6B7280",
    marginTop: scale(4),
    marginBottom: scale(12),
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewButton: {
    backgroundColor: "#10B981",
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },

  rightButtons: {
    flexDirection: "row",
    gap: scale(8),
  },

  iconButton: {
    backgroundColor: PRIMARY,
    padding: scale(8),
    borderRadius: moderateScale(8),
  },

  deleteIconButton: {
    backgroundColor: "#EF4444",
    padding: scale(8),
    borderRadius: moderateScale(8),
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: responsiveFont(13),
  },

  fab: {
    position: "absolute",
    bottom: scale(25),
    right: scale(25),
    backgroundColor: PRIMARY,
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(6),
  },

  empty: {
    textAlign: "center",
    marginTop: scale(40),
    color: "#9CA3AF",
    fontSize: responsiveFont(14),
  },
});