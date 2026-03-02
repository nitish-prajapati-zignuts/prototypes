import { StyleSheet } from "react-native";
import useResponsive from "@/hooks/useResponsive";

export const useLoginStyles = () => {
  const { 
    isTablet, 
    isLandscape, 
    fontSize, 
    spacing, 
    wp 
  } = useResponsive();

  return StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: "#EAEFEF",
      paddingVertical: spacing(4), 
    },
    card: {
      width: isTablet ? 500 : wp(90), 
      maxWidth: 500,
      minHeight: isLandscape ? 'auto' : 'auto',
      
      backgroundColor: "#fff",
      borderRadius: 20,
      
      paddingHorizontal: wp(6),
      paddingVertical: isLandscape ? spacing(6) : spacing(10),
      
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
    },
    inputGroup: {
      width: "100%",
      marginBottom: spacing(3),
    },
    title: {
      fontSize: fontSize(26), 
      fontWeight: "800",
      marginBottom: spacing(1),
      textAlign: "center", 
      color: "#1A1A1A",
    },
    subtitle: {
      fontSize: fontSize(14),
      color: "#666",
      marginBottom: isLandscape ? spacing(3) : spacing(6),
      textAlign: "center",
    },
    label: {
      fontSize: fontSize(14),
      fontWeight: "600",
      marginBottom: 8,
      color: "#333",
    },
    input: {
      height: isTablet ? 60 : 50,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      paddingHorizontal: 15,
      fontSize: fontSize(14),
      backgroundColor: "#f9f9f9",
    },
    button: {
      backgroundColor: "#841584",
      paddingVertical: isTablet ? 16 : 14, 
      borderRadius: 12,
      alignItems: "center",
      marginTop: spacing(2), 
    },
    buttonText: {
      color: "#fff",
      fontSize: fontSize(16),
      fontWeight: "600",
    },
    error: {
      color: "red",
      fontSize: fontSize(12),
      marginTop: -spacing(1), 
      marginBottom: spacing(2),
    }
  });
};