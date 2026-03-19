import { StyleSheet } from "react-native";
import { scale, moderateScale, responsiveFont } from "./responsive";
import { Colors } from "@/constants/Colors";

export const ProjectStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundGrey, // Updated from #F3F4F6
  },
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: Colors.backgroundGrey,
  },

  card: {
    backgroundColor: Colors.white,
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: scale(14),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(6),
    elevation: 4,
  },

  title: {
    fontSize: responsiveFont(18),
    fontWeight: "700",
    color: Colors.textMain, // Updated from #111827
  },

  heading: {
    fontSize: responsiveFont(24),
    fontWeight: "700",
    color: Colors.textMain,
  },

  subheading: {
    fontSize: responsiveFont(16),
    fontWeight: "500",
    marginBottom: scale(20),
    color: Colors.textMain,
  },

  description: {
    fontSize: responsiveFont(14),
    color: Colors.textLight, // Updated from #6B7280
    marginTop: scale(4),
    marginBottom: scale(12),
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewButton: {
    backgroundColor: Colors.secondary, // Updated from #10B981
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
    backgroundColor: Colors.primary, // Replaced PRIMARY variable
    padding: scale(8),
    borderRadius: moderateScale(8),
  },

  deleteIconButton: {
    backgroundColor: Colors.error, // Updated from #EF4444
    padding: scale(8),
    borderRadius: moderateScale(8),
  },

  buttonText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: responsiveFont(13),
  },

  fab: {
    position: "absolute",
    bottom: scale(25),
    right: scale(25),
    backgroundColor: Colors.primary,
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(6),
  },

  empty: {
    textAlign: "center",
    marginTop: scale(40),
    color: Colors.textPlaceholder, // Updated from #9CA3AF
    fontSize: responsiveFont(14),
  },
});