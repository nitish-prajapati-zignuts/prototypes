import { StyleSheet } from "react-native";
import { scale, responsiveFont, PRIMARY } from "./responsive";
import { Colors } from "@/constants/Colors";


export const AddProjectScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
  },
  container: {
    flex: 1,
    padding: scale(20),
    backgroundColor: Colors.backgroundAlt,
  },

  heading: {
    fontSize: responsiveFont(24),
    fontWeight: "700",
    marginBottom: scale(20),
    color: Colors.textMain,
  },

  label: {
    fontSize: responsiveFont(14),
    fontWeight: "600",
    marginBottom: scale(6),
    color: Colors.textMain,
  },

  input: {
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    padding: scale(12),
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: scale(10),
  },

  textArea: {
    height: scale(100),
    textAlignVertical: "top",
  },

  error: {
    color: Colors.error,
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

