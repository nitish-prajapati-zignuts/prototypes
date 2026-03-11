import { StyleSheet } from "react-native";
import { scale,responsiveFont, PRIMARY } from "./responsive";


export const AddProjectScreenStyles = StyleSheet.create({
 safeArea:{
  flex: 1,
  backgroundColor: "#F9FAFB",
 },
  container: {
    flex: 1,
    padding: scale(20),
    backgroundColor: "#F9FAFB",
  },

  heading: {
    fontSize: responsiveFont(24),
    fontWeight: "700",
    marginBottom: scale(20),
    color: "#111827",
  },

  label: {
    fontSize: responsiveFont(14),
    fontWeight: "600",
    marginBottom: scale(6),
    color: "#374151",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: scale(10),
    padding: scale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: scale(10),
  },

  textArea: {
    height: scale(100),
    textAlignVertical: "top",
  },

  error: {
    color: "#EF4444",
    marginBottom: scale(10),
    fontSize: responsiveFont(12),
  },

  saveButton: {
    backgroundColor: PRIMARY,
    padding: scale(14),
    borderRadius: scale(10),
    alignItems: "center",
    marginTop: scale(10),
  },

  saveText: {
    color: "#fff",
    fontSize: responsiveFont(16),
    fontWeight: "600",
  },
});

