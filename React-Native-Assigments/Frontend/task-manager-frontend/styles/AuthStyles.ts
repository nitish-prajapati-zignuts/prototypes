import { Dimensions, PixelRatio, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const BASE_WIDTH = 375;

export const scale = (size: number) => (width / BASE_WIDTH) * size;

export const responsiveSize = (size: number) =>
  PixelRatio.roundToNearestPixel(scale(size));

export const AuthStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
    paddingHorizontal: responsiveSize(20),
  },

  title: {
    fontSize: responsiveSize(26),
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: responsiveSize(8),
  },

  subtitle: {
    fontSize: responsiveSize(14),
    color: "#666",
    marginBottom: responsiveSize(25),
  },

  input: {
    width: "100%",
    height: responsiveSize(45),
    borderColor: "#e3e3f2ff",
    borderWidth: 1,
    borderRadius: responsiveSize(8),
    marginBottom: responsiveSize(15),
    paddingHorizontal: responsiveSize(12),
    backgroundColor: "#FFFFFF",
    fontSize: responsiveSize(14),
  },

  button: {
    width: "100%",
    height: responsiveSize(45),
    backgroundColor: "#4A6CF7",
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

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: responsiveSize(16),
  },

  footerText: {
    marginTop: responsiveSize(15),
    fontSize: responsiveSize(14),
    color: "#666",
  },

  linkText: {
    color: "#4A6CF7",
    fontWeight: "600",
  },
});
