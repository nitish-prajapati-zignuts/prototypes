import { Colors } from "@/constants/Colors";
import { Dimensions, PixelRatio, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const BASE_WIDTH = 375;

export const scale = (size: number) => (width / BASE_WIDTH) * size;
export const responsiveSize = (size: number) => PixelRatio.roundToNearestPixel(scale(size));

export const AuthStyles = StyleSheet.create({
  // Structural Styles
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(40),
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
  },

  // Typography & Labels
  title: {
    fontSize: responsiveSize(26),
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: responsiveSize(8),
    textAlign: "center",
  },
  subtitle: {
    fontSize: responsiveSize(14),
    color: "#666",
    marginBottom: responsiveSize(25),
    textAlign: "center",
  },
  label: {
    fontSize: responsiveSize(14),
    fontWeight: "600",
    color: "#374151",
    marginBottom: responsiveSize(6),
    alignSelf: "flex-start",
  },

  // Inputs & Errors
  input: {
    width: "100%",
    height: responsiveSize(48),
    borderColor: Colors.borderInput,
    borderWidth: 1,
    borderRadius: responsiveSize(8),
    marginBottom: responsiveSize(4), // Reduced to keep error text close
    paddingHorizontal: responsiveSize(12),
    backgroundColor: Colors.white,
    fontSize: responsiveSize(14),
  },
  errorText: {
    color: Colors.error,
    fontSize: responsiveSize(12),
    marginBottom: responsiveSize(12),
    alignSelf: "flex-start",
  },

  // Buttons
  button: {
    width: "100%",
    height: responsiveSize(48),
    backgroundColor: Colors.avatarBg,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: responsiveSize(8),
    marginTop: responsiveSize(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
    backgroundColor: Colors.disabled,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: responsiveSize(16),
  },

  // Footer
  footerText: {
    marginTop: responsiveSize(15),
    fontSize: responsiveSize(14),
    color: "#666",
  },
  linkText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});